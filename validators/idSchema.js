import Joi from "joi";

const idSchema = Joi.object({
  id: Joi.string().required(),
});
