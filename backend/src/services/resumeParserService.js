import fs from "fs";
import PDFParser from "pdf2json";
import mammoth from "mammoth";

/**
 * Safely decode URI component to prevent URI malformed error
 */
function safeDecodeURIComponent(str) {
  if (!str) return "";
  try {
    return decodeURIComponent(str);
  } catch (error) {
    try {
      // Escape any single % characters that aren't part of a valid 2-digit hex escape sequence
      return decodeURIComponent(str.replace(/%(?![0-9a-fA-F]{2})/g, "%25"));
    } catch (e) {
      return str;
    }
  }
}

/**
 * Extract text from PDF using pdf2json
 */
async function extractPdfText(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on(
      "pdfParser_dataError",
      (errData) => {
        reject(errData.parserError);
      }
    );

    pdfParser.on(
      "pdfParser_dataReady",
      (pdfData) => {
        try {
          let text = "";

          pdfData.Pages.forEach((page) => {
            page.Texts.forEach((textItem) => {
              textItem.R.forEach((run) => {
                text +=
                  safeDecodeURIComponent(run.T) +
                  " ";
              });
            });

            text += "\n";
          });

          resolve(text);
        } catch (error) {
          reject(error);
        }
      }
    );

    pdfParser.loadPDF(filePath);
  });
}

/**
 * Extract raw text from uploaded resume
 * Supports PDF and DOCX
 */
export async function extractResumeText(
  filePath,
  fileType
) {
  try {
    let extractedText = "";

    if (fileType === "pdf") {
      extractedText =
        await extractPdfText(filePath);
    } else if (fileType === "docx") {
      const result =
        await mammoth.extractRawText({
          path: filePath,
        });

      extractedText = result.value;
    } else {
      throw new Error(
        "Unsupported file format"
      );
    }

    return cleanResumeText(
      extractedText
    );
  } catch (error) {
    console.error(
      "Resume extraction error:",
      error
    );

    throw new Error(
      "Failed to extract resume text"
    );
  }
}

/**
 * Basic preprocessing before sending text to Gemini
 */
export function cleanResumeText(text) {
  if (!text) return "";

  return text
    .replace(/\r/g, " ")
    .replace(/\n+/g, "\n")
    .replace(/\t+/g, " ")
    .replace(/[ ]+/g, " ")
    .trim();
}

/**
 * Extract simple metadata before Gemini analysis
 */
export function parseResumeMetadata(
  text
) {
  const lowerText =
    text.toLowerCase();

  const commonSkills = [
    "c",
    "c++",
    "java",
    "javascript",
    "typescript",
    "python",
    "react",
    "react native",
    "node",
    "express",
    "mongodb",
    "mysql",
    "postgresql",
    "html",
    "css",
    "tailwind",
    "redux",
    "nextjs",
    "aws",
    "docker",
    "kubernetes",
    "git",
    "github",
    "rest api",
    "graphql",
    "php",
    "laravel",
    "flutter",
    "android",
    "firebase",
  ];

  const detectedSkills =
    commonSkills.filter((skill) =>
      lowerText.includes(
        skill.toLowerCase()
      )
    );

  return {
    detectedSkills,
    textLength: text.length,
  };
}

/**
 * Validate uploaded file type
 */
export function getResumeFileType(
  fileName
) {
  const extension = fileName
    .split(".")
    .pop()
    ?.toLowerCase();

  if (extension === "pdf") {
    return "pdf";
  }

  if (extension === "docx") {
    return "docx";
  }

  throw new Error(
    "Only PDF and DOCX resumes are supported"
  );
}

/**
 * Complete resume processing pipeline
 */
export async function processResume(
  filePath,
  fileName
) {
  const fileType =
    getResumeFileType(fileName);

  const extractedText =
    await extractResumeText(
      filePath,
      fileType
    );

  const metadata =
    parseResumeMetadata(
      extractedText
    );

  return {
    fileType,
    extractedText,
    metadata,
  };
}