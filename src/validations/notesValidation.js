import { Joi, Segments } from "celebrate";
import { tags } from "../constants/tags.js";
import  isValidateObjectId  from "mongoose";

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    search: Joi.string().trim().allow(''),
    tag: Joi.string().valid(...tags),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
  }),
};

const objectIdValidator = (value, helpers) => {
  return isValidateObjectId(value) ? value : helpers.message("Invalid id value");
};
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
  noteId: Joi.string().custom(objectIdValidator).required()
})
};


export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().default(''),
    tag: Joi.string().valid(...tags).default("Todo")
  })
};


export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().default(''),
    tag: Joi.string()
      .valid(...tags)
      .default('Todo'),
  }).min(1)
};
