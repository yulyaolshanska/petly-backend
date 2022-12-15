const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const path = require("path");
// const configPath = path.join(__dirname, "..", "config", ".env");
// require("dotenv").config({ path: configPath });
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  secure: true,
});

// const api_key = process.env.CLOUDINARY_API_KEY;
// const api_secret = process.env.CLOUDINARY_API_SECRET;

// cloudinary.config({
//   cloud_name: "dxxsrtjlb",
//   api_key,
//   api_secret,
// });

const cloudUpload = async (uploadPath, public_id, folder, format) => {
  try {
    // const resultOfUpload = await cloudinary.uploader.upload(uploadPath, {
    //   public_id,
    //   folder,
    //   format,
    //   transformation: { width: 350, height: 350, crop: "fill" },
    // });
    const uploader = async path => await cloudinary.uploads(path, "petly_dir/notice_avatar");
    const newPath = await uploader(uploadPath);

    const resultUrl = newPath.url;
    // const resultId = resultOfUpload.public_id;

    return { resultUrl };
  } catch (error) {
    throw error;
  }
};

const cloudDelete = async photoId => {
  try {
    await cloudinary.uploader.destroy(photoId);
  } catch (error) {
    throw error;
  }
};

module.exports = { cloudUpload, cloudDelete };
