import { Router } from 'express';
import {
  getUsers, getUserById,
  updateProfile, updateAvatar,
  getCurrentUser,
} from '../controllers/users';
import validateUpdateProfile from '../validators/updateProfile';
import validateUpdateAvatar from '../validators/updateAvatar';
import validateUserId from '../validators/userId';

const route = Router();

route.get('/me', getCurrentUser);
route.get('/', getUsers);
route.get('/:userId', validateUserId, getUserById);
route.patch('/me', validateUpdateProfile, updateProfile);
route.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

export default route;
