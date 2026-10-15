import mongoose from 'mongoose';
import express, { Response, Request, NextFunction } from 'express';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import auth from './middlewares/auth';
import './types/express';

mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

interface IError extends Error {
  statusCode?: number;
}

app.use((req:Request, res:Response) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err: IError, req:Request, res:Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
