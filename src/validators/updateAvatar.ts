import { celebrate, Joi, Segments } from 'celebrate';

const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});

export default validateUpdateAvatar;
