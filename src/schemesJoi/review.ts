import Joi from "joi";

export const schemaReview = Joi.object({
  firstName: Joi.string().max(20).required(),
  secondName: Joi.string().max(20),
  content: Joi.string().required(),
  advantages: Joi.string().required(),
  disAdvantages: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  product: Joi.number().min(1).required(),
});

export const schemaReplyToReview = Joi.object({
  firstName: Joi.string().max(20).required(),
  lastName: Joi.string().max(20),
  content: Joi.string().required(),
});

export const schemaChangeStatusReview = Joi.object({
  isPublication: Joi.boolean().required(),
});

export const schemaChangeReplyToReview = Joi.object({
  isPublication: Joi.boolean().required(),
  content: Joi.string(),
});
