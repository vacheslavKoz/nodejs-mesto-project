import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  req.user = { _id: '6ad402cc7338e6fdb9b8bc4b' };
  next();
};
