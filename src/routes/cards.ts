import { Router } from 'express';
import {
  getCards, createCard,
  deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';
import validateCardId from '../validators/cardId';
import validateCreateCard from '../validators/createCard';

const router = Router();

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

export default router;
