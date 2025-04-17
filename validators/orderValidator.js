import Joi from "joi";

const createOrderSchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
});

const deleteOrderSchema = Joi.object({
    id: Joi.string().required(),
})

const updateOrderSchema = Joi.object({
    id: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
})
 
export { createOrderSchema, deleteOrderSchema, updateOrderSchema };
