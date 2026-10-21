import { celebrate, Joi, Segments } from 'celebrate';

const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});
export default validateUpdateProfile;
