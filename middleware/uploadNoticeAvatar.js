const fs = require("fs/promises");
const { cloudUpload } = require("../services/db/notices/cloudinaryServices");

const uploadMiddleware = async (req, res, next) => {
  req.photo = {};
  if (!req.file) {
    delete req.body.image;
    req.body.avatar = "https://res.cloudinary.com/dwghwsgmr/image/upload/v1671117182/637c99e2957b3cf05e40fc6e_48031_qd5fe6.png";
    req.photo.photoId = "";
    return next();
  }
  const { path: tempUpload, originalname } = req.file;
  const format = originalname.split(".").pop();
  const { _id } = req.user;
  const publicId = `${_id + "_" + Date.now()}`;

  try {
    const { resultUrl } = await cloudUpload(tempUpload, publicId, format);
    req.body.avatar = resultUrl;
    req.photo.photoId = publicId;
    next();
  } catch (error) {
    throw error;
  } finally {
    await fs.unlink(req.file.path);
  }
};

module.exports = uploadMiddleware;
