import * as Joi from 'joi'

export const CartRequest = Joi.object({
    id_product: Joi.required()
})