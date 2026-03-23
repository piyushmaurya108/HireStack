// routes/execute.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript" },
  python: { language: "python" },
  java: { language: "java" },
};

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };
  return extensions[language] || "txt";
}

router.post("/execute", async (req, res) => {
  const { language, code, input } = req.body;

  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return res.status(400).json({ error: `Unsupported language: ${language}` });
    }

    console.log(`Executing ${language} code...`);  // Debug log

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      }),
    });

    console.log(`Piston response status: ${response.status}`);  // Debug log

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Piston API error: ${errorText}`);
      throw new Error(`Piston API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`Execution result:`, data);  // Debug log
    res.json(data);

  } catch (err) {
    console.error(`Execution error:`, err);  // Debug log
    res.status(500).json({ error: err.message });
  }
});

export default router;