import { v2 as cloudinary } from "cloudinary"

const hasCloudinaryConfig = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
)

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

export const isCloudinaryEnabled = hasCloudinaryConfig

export const uploadBufferToCloudinary = (buffer, originalname) => {
  const folder = process.env.CLOUDINARY_FOLDER || "panaderia"
  const baseName = originalname.replace(/\.[^/.]+$/, "")

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: `${Date.now()}-${baseName}`,
      },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }

        resolve(result)
      }
    )

    stream.end(buffer)
  })
}