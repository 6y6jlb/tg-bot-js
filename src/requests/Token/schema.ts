import Joi from 'joi';


export const storeSchema = Joi.object({})

export const getSchema = Joi.object({});

export const deleteSchema = Joi.object({});

export const refreshSchema = Joi.object({
    refresh_token: Joi.string().required()
});

