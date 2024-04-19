import * as Joi from 'joi'

export const TypePoductRequest = Joi.object({
    type_product: Joi.required(),
});