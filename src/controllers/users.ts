import { Response, Request } from 'express';
import { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } from '../constants';
import User from '../models/user';

export const getUsers = (req:Request, res:Response) => {
  User.find({}).then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка' }));
};

export const getUserById = (req:Request, res:Response) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      return res.status(NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
    res.send(user);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Некорректный _id' });
      }
      res.status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

export const createUser = (req:Request, res:Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      }
      res.status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

export const updateProfile = (req:Request, res:Response) => {
  const { name, about } = req.body;
  const userId = req.user!._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true }).then((user) => {
    if (!user) {
      return res.status(NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
    res.status(200).send(user);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

export const updateAvatar = (req:Request, res:Response) => {
  const { avatar } = req.body;
  const userId = req.user!._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true }).then((user) => {
    if (!user) {
      return res.status(NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
    res.status(200).send(user);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};
