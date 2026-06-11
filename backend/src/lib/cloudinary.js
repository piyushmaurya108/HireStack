import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadResumeToCloudinary(filePath) {
  return cloudinary.uploader.upload(filePath, {
    resource_type: "raw",
    folder: "hirestack/resumes",
  });
}

export async function deleteResumeFromCloudinary(publicId) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
  });
}

export { cloudinary };