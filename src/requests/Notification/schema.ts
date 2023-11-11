import Joi from 'joi';


export const sendSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    contacts: Joi.string().min(3).max(30).required(),
    message: Joi.string().min(5).max(500).required(),
});