import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = "uploads/resumes";

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only PDF and DOCX files are allowed"
    ),
    false
  );
};

const uploadMiddleware = multer({
  storage,

  fileFilter,

  limits: {
    fileSize:
      Number(
        process.env.MAX_RESUME_FILE_SIZE
      ) ||
      5 * 1024 * 1024,
  },
}).single("resume");

export default uploadMiddleware;