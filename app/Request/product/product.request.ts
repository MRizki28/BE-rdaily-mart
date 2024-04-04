import * as Joi from 'joi';

export const ProductRequest = Joi.object({
    product_name: Joi.string().required(),
    stok: Joi.string().required(),
    product_image: Joi.required(),
});