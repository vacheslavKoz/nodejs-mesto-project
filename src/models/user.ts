import mongoose from 'mongoose';
import validator from 'validator';

interface IUser{
name: string;
about: string;
avatar: string;
password: string;
email: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String, minlength: 2, maxlength: 30, default: 'Жак-Ив Кусто',
  },
  about: {
    type: String, minlength: 2, maxlength: 200, default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v: string) => /^https?:\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?#?$/.test(v),
      message: 'Некорректная ссылка на аватар',
    },
  },
  password: {
    type: String, required: true, select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Некорректный email',
    },
  },

});
export default mongoose.model<IUser>('user', userSchema);
