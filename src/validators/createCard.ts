import { celebrate, Joi, Segments } from 'celebrate';

const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().uri(),
  }),
});
export default validateCreateCard;
