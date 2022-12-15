const { addNoticeService, addNotieceId } = require("../../services/db/notices/noticeServices");
const createError = require("http-errors");

const { ObjectId } = require("mongodb");
const CATHEGORY = ["sell", "lost_found", "in_good_hands"];

const addNoticeCTRL = async (req, res) => {
  const data = req.body;
  const { photoId } = req.photo;
  const { category } = req.query;
  const { _id } = req.user;
  const newId = new ObjectId(_id);

  try {
    const isEnableCategory = CATHEGORY.indexOf(category); //TODO  del this
    if (isEnableCategory === -1) {
      return res.status(400).json({ message: "Not available category" });
    }
    const availableCategory = CATHEGORY[isEnableCategory];

    const newData = { ...data, photoId, category: availableCategory, owner: newId };
    const newNotice = await addNoticeService(newData);

    return res.status(201).json({ newNotice });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = addNoticeCTRL;
