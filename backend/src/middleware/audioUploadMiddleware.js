import multer from "multer";
import path from "path";
import fs from "fs";

const audioUploadDirectory = "uploads/audio";

if (!fs.existsSync(audioUploadDirectory)) {
  fs.mkdirSync(audioUploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, audioUploadDirectory);
  },

  filename: (req, file, cb) => {
    // Add extension, defaulting to .webm if not provided
    const ext = path.extname(file.originalname) || ".webm";
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow any audio mimetype or webm video formats (MediaRecorder defaults to video/webm in some browsers)
  if (
    file.mimetype.startsWith("audio/") ||
    file.mimetype === "video/webm" ||
    file.mimetype === "video/mp4"
  ) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Unsupported audio/video format for transcription: " + file.mimetype
    ),
    false
  );
};

const audioUploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (plenty for voice responses)
  },
}).single("audio");

export default audioUploadMiddleware;
