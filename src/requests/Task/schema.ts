import Joi from 'joi';


export const getSchema = Joi.object({
    task_id: Joi.string().allow(null),
});

export const storeSchema = Joi.object({
    user_id: Joi.string().allow(null),
    tz: Joi.string().min(3).max(50),
    call_at: Joi.string().required(),
    is_regular: Joi.boolean(),
    options: Joi.array().min(1).required().items(Joi.object({
        event_type: Joi.string(),
        param: Joi.string()
    })),
});

export const updateSchema = Joi.object({
    task_id: Joi.string().required(),
    tz: Joi.string().min(3).max(50),
    call_at: Joi.string().required(),
    is_regular: Joi.boolean(),
    options: Joi.array().min(1).required().items(Joi.object({
        event_type: Joi.string(),
        param: Joi.string()
    })),
})


export const deleteSchema = Joi.object({
    task_id: Joi.string().required(),
});

