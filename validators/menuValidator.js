import Joi from "joi";

// joischema som är kopplat till URL så
// de blir rätt format när man hämtar enskild produkt

export const menuParamsSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
