import * as Joi from 'joi';

export const ProductRequest = Joi.object({
    product_name: Joi.string().required(),
    price: Joi.required(),
    stok: Joi.required(),
    product_image: Joi.required(),
});