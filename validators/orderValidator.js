import Joi from "joi";

const createOrderSchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
});
 
export { createOrderSchema };
