import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import BadRequestError from '../errors/bad-request-err';
import UnauthorizedError from '../errors/unauthorized-err';
import NotFoundError from '../errors/not-found-err';
import ConflictError from '../errors/conflict-err';

export const getUsers = (req:Request, res:Response, next: NextFunction) => {
  User.find({}).then((users) => res.send(users))
    .catch(next);
};

export const getUserById = (req:Request, res:Response, next: NextFunction) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      throw new NotFoundError('пользователь не найден');
    }
    res.send(user);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный _id'));
      }
      return next(err);
    });
};

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!._id;
  User.findById(userId).then((user) => {
    if (!user) { throw new NotFoundError('такого пользователя нет!'); }
    res.send(user);
  })
    .catch(next);
};

export const createUser = (req:Request, res:Response, next: NextFunction) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name, about, avatar, password: hash, email,
  })).then((user) => res.status(201).send({
    _id: user._id,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    email: user.email,
  }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new UnauthorizedError('Неверный логин или пароль');
    }
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) { throw new UnauthorizedError('Неверный логин или пароль'); }
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    });
  }).catch(next);
};

export const updateProfile = (req:Request, res:Response, next: NextFunction) => {
  const { name, about } = req.body;
  if (!req.user) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const userId = req.user!._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  ).then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).send(user);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

export const updateAvatar = (req:Request, res:Response, next: NextFunction) => {
  const { avatar } = req.body;
  if (!req.user) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const userId = req.user!._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  ).then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).send(user);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};
