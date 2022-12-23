const { Pet } = require("../../models/pets");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");

const addPet = async (req, res) => {
  const { _id } = req.user;
  const newId = new ObjectId(_id);
  const { photoId } = req.photo;

  try {
    const newPet = await Pet.create({ ...req.body, photoId, owner: newId });
    res.status(201).json({
      message: "success",
      data: { result: newPet },
    });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = addPet;
