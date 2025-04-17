import Joi from "joi";

// schema för att skapa användare med POST,
//username:kollar så att det är en sträng med minst 1 bokstav
//Password: alternatives() för att kolla om det är antingen en string lr number


const createUserSchema = Joi.object({
    username: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    password: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
}).options({ stripUnknown: true}) // matar man in nått annat än username / password filtreras det bort.

//schema för att logga in användare,
// username: kollar att username är en sträng , måste vara med
//password: godkänner både en sträng & eller ett number.
const loginUserSchema = Joi.object({
    username: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    password: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
})

export { createUserSchema, loginUserSchema}