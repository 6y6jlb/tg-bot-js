import Joi from 'joi';


export const loginSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
});

export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    password_repeat: Joi.any().valid(Joi.ref('password')).required()
});