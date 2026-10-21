import { celebrate, Joi, Segments } from 'celebrate';

const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});
export default validateSignin;
