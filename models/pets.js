const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleError } = require("../helpers");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for pets"],
    },
    birthday: {
      type: String,
      default: "01.01.1900",
    },
    breed: {
      type: String,
      default: "",
    },
    comments: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    photoId: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post("save", handleError);

const addPetSchema = Joi.object({
  name: Joi.string().required(),
  birthday: Joi.string(),
  breed: Joi.string().min(2).max(16),
  comments: Joi.string().min(8).max(120),
  avatar: Joi.string(),
});

const schemasPet = { addPetSchema };

const Pet = model("pet", petSchema);

module.exports = { Pet, schemasPet };
