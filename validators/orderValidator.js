import Joi from "joi";

// joischema som är kopplat till post så req.body blir kollat

const createOrderSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});
// joischema som är kopplat till delete så req.body blir kollat
const deleteOrderSchema = Joi.object({
  id: Joi.string().required(),
});
// joischema som är kopplat till put så req.body blir kollat
const updateOrderSchema = Joi.object({
  id: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

export { createOrderSchema, deleteOrderSchema, updateOrderSchema };
