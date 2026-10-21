import { celebrate, Joi, Segments } from 'celebrate';

const validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});
export default validateCardId;
