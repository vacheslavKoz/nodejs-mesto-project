import { Request, Response, NextFunction } from 'express';

export default (req: Request, res:Response, next: NextFunction) => {
  req.user = { _id: '6acfda494cdb497f5ad8d3d6' };
  next();
};
