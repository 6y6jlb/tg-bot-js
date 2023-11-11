import Joi from 'joi';


export const getSchema = Joi.object({
  count: Joi.number().min(1),
  target: Joi.string().min(3).max(3).required(),
  current: Joi.string().min(3).max(3).required(),
});