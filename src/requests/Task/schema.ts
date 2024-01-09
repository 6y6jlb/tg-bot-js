import Joi from 'joi';


export const getSchema = Joi.object({
    task_id: Joi.string().allow(null),
});

export const storeSchema = Joi.object({
    user_id: Joi.string().required(),
    tz: Joi.string().min(3).max(50),
    call_at: Joi.string().required(),
    is_reqular: Joi.bool(),
    options: Joi.array(),
    event_type: Joi.string().required()
});

export const updateSchema = Joi.object({
    task_id: Joi.string().required(),
    tz: Joi.string().min(3).max(50),
    call_at: Joi.string().required(),
    is_reqular: Joi.boolean(),
    options: Joi.array(),
})


export const deleteSchema = Joi.object({
    task_id: Joi.string().required(),
});

