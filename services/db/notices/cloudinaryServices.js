const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  secure: true,
});

const cloudUpload = async (uploadPath, publicId, format) => {
  const resultOfUpload = await cloudinary.uploader.upload(uploadPath, {
    publicId,
    format,
    transformation: { width: 350, height: 350, crop: "fill" },
  });
  const resultUrl = resultOfUpload.url;
  // const resultId = resultOfUpload.publicId;
  return { resultUrl };
};

const cloudDelete = async photoId => {
  try {
    await cloudinary.uploader.destroy(photoId);
  } catch (error) {
    throw error;
  }
};

module.exports = { cloudUpload, cloudDelete };
