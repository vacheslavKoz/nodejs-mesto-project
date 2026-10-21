import { celebrate, Joi, Segments } from 'celebrate';

const validateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    password: Joi.string().required().min(8),
    email: Joi.string().email().required(),
  }),
});
export default validateUser;
