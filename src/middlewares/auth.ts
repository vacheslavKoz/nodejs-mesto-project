import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch {
    return res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }
  req.user = payload as {_id: string};
  return next();
};
