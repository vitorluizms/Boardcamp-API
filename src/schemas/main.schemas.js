import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().required(),
  stockTotal: joi.number().min(1).required(),
  pricePerDay: joi.number().min(1).required(),
});

export const clientSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().alphanum().min(10).max(11).required(),
  cpf: joi.string().alphanum().length(11).required(),
  birthday: joi.date().iso().required(),
});
