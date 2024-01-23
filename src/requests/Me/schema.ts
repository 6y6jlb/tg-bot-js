import Joi from 'joi';




export const UpdateMeSchema = Joi.object({
    email: Joi.string().email(),
    telegram_id: Joi.string(),
    name: Joi.string(),
    currency: Joi.string(),
    location: Joi.string(),
    tz: Joi.string(),
    password: Joi.string().min(3).max(30).required(),
});


