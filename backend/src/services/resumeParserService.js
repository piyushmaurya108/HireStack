import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

/**
 * Extract raw text from uploaded resume
 * Supports PDF and DOCX
 */
export async function extractResumeText(filePath, fileType) {
  try {
    let extractedText = "";

    if (fileType === "pdf") {
      const buffer = fs.readFileSync(filePath);

      const pdfData = await pdfParse(buffer);

      extractedText = pdfData.text;
    } else if (fileType === "docx") {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      extractedText = result.value;
    } else {
      throw new Error("Unsupported file format");
    }

    return cleanResumeText(extractedText);
  } catch (error) {
    console.error("Resume extraction error:", error);

    throw new Error("Failed to extract resume text");
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
 * Gemini will do the actual intelligent parsing later.
 */
export function parseResumeMetadata(text) {
  const lowerText = text.toLowerCase();

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

  const detectedSkills = commonSkills.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );

  return {
    detectedSkills,
    textLength: text.length,
  };
}

/**
 * Validate uploaded file type
 */
export function getResumeFileType(fileName) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (extension === "pdf") {
    return "pdf";
  }

  if (extension === "docx") {
    return "docx";
  }

  throw new Error("Only PDF and DOCX resumes are supported");
}

/**
 * Complete resume processing pipeline
 */
export async function processResume(filePath, fileName) {
  const fileType = getResumeFileType(fileName);

  const extractedText = await extractResumeText(
    filePath,
    fileType
  );

  const metadata = parseResumeMetadata(extractedText);

  return {
    fileType,
    extractedText,
    metadata,
  };
}