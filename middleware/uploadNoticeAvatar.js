const fs = require("fs/promises");
const { cloudUpload } = require("../services");

const uploadMiddleware = async (req, res, next) => {
  if (!req.file) {
    delete req.body.image;
    req.body.photoURL = "https://res.cloudinary.com/dwghwsgmr/image/upload/v1671117182/637c99e2957b3cf05e40fc6e_48031_qd5fe6.png";
    req.body.photoId = "";
    return next();
  }

  const { path: tempUpload, originalname } = req.file;
  const format = originalname.split(".").pop();
  const { _id } = req.user;

  const folder = req.baseUrl.split("/")[3];

  const public_id = `${folder.slice(0, -1) + "_" + _id + "_" + Date.now()}`;

  try {
    const { resultUrl, resultId } = await cloudUpload(tempUpload, public_id, folder, format);

    req.photo = {};
    folder === "users"
      ? ((req.photo.photoURL = resultUrl), (req.photo.photoId = resultId))
      : ((req.body.photoURL = resultUrl), (req.body.photoId = resultId));

    next();
  } catch (error) {
    throw error;
  } finally {
    await fs.unlink(req.file.path);
  }
};

module.exports = uploadMiddleware;
