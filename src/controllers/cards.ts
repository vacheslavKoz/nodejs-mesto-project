import { Response, Request } from 'express';
import { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } from '../constants';
import Card from '../models/card';

export const getCards = (req:Request, res:Response) => {
  Card.find({}).then((cards) => res.send(cards)).catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'ошибка сервера' }));
};

export const createCard = (req:Request, res:Response) => {
  const { name, link } = req.body;
  if (!req.user) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const userId = req.user!._id;
  Card.create({ name, link, owner: userId }).then((card) => res.status(201).send(card)).catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: 'не корректные данные!' });
    }
    res.status(INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка' });
  });
};

export const deleteCard = (req:Request, res:Response) => {
  Card.findByIdAndDelete(req.params.cardId).then((card) => {
    if (!card) {
      return res.status(NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    res.send(card);
  }).catch((err) => {
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST)
        .send({ message: 'не корректные данные!' });
    }
    res.status(INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка' });
  });
};

export const likeCard = (req:Request, res:Response) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return res.status(NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    res.send(card);
  }).catch((err) => {
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST)
        .send({ message: 'не корректные данные!' });
    }
    res.status(INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка' });
  });
};

export const dislikeCard = (req:Request, res:Response) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.send(card);
  }).catch((err) => {
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST)
        .send({ message: 'не корректные данные!' });
    }
    res.status(INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка' });
  });
};
