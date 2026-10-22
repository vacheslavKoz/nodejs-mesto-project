import { celebrate, Joi, Segments } from 'celebrate';

const validateUserId = celebrate({
  [Segments.PARAMS]:
Joi.object().keys({
  userId: Joi.string().hex().length(24).required(),

}),
});

export default validateUserId;
