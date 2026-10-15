import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({});
    if (user) {
      req.user = { _id: user._id.toString() };
    }
    next();
  } catch (err) {
    next(err);
  }
};
