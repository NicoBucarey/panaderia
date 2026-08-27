import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

const isConfigured = Boolean(
  env.CLOUDINARY_CLOUD_NAME &&
    env.CLOUDINARY_API_KEY &&
    env.CLOUDINARY_API_SECRET
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
}

export const cloudinaryService = {
  isConfigured,

  async uploadBuffer(buffer, originalName) {
    if (!isConfigured) {
      throw new Error("Cloudinary no está configurado");
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: env.CLOUDINARY_FOLDER,
          public_id: originalName ? `${Date.now()}-${originalName.replace(/\.[^/.]+$/, "")}` : undefined,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );

      stream.end(buffer);
    });
  },

  async deleteByPublicId(publicId) {
    if (!publicId || !isConfigured) {
      return false;
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok" || result.result === "not found";
  },
};
