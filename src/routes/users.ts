import { Router } from 'express';
import {
  getUsers, getUserById,
  updateProfile, updateAvatar,
} from '../controllers/users';

const route = Router();

route.get('/', getUsers);
route.get('/:userId', getUserById);
route.patch('/me', updateProfile);
route.patch('/me/avatar', updateAvatar);

export default route;
