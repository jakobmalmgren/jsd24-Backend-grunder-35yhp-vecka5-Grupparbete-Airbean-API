import Joi from "joi";

export const menuParamsSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
