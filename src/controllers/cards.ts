import { Response, Request, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-err';
import UnauthorizedError from '../errors/unauthorized-err';
import NotFoundError from '../errors/not-found-err';
import ForbiddenError from '../errors/forbidden-err';
import Card from '../models/card';

export const getCards = (req:Request, res:Response, next: NextFunction) => {
  Card.find({}).then((cards) => res.send(cards)).catch(next);
};

export const createCard = (req:Request, res:Response, next: NextFunction) => {
  const { name, link } = req.body;
  if (!req.user) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const userId = req.user!._id;
  Card.create({ name, link, owner: userId }).then((card) => res.status(201).send(card)).catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('не корректные данные!'));
    }
    return next(err);
  });
};

export const deleteCard = async (req:Request, res:Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new UnauthorizedError('необходима авторизация'));
    }
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return next(new NotFoundError('карточка не найдена'));
    }
    if (card.owner.toString() !== req.user._id) { return next(new ForbiddenError('у вас нет прав доступа')); }
    await card.deleteOne();
    return res.send(card);
  } catch (err) {
    return next(err);
  }
};

export const likeCard = (req:Request, res:Response, next: NextFunction) => {
  if (!req.user) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.send(card);
  }).catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError('не корректные данные!'));
    }
    return next(err);
  });
};

export const dislikeCard = (req:Request, res:Response, next: NextFunction) => {
  if (!req.user) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.send(card);
  }).catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError('не корректные данные!'));
    }
    return next(err);
  });
};
