import express from 'express';
import {
  addToCart,
  removeFromCart,
  listCart,
} from '../controllers/cartController.js';
import verifyToken from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', verifyToken, addToCart);
cartRouter.post('/remove', verifyToken, removeFromCart);
cartRouter.post('/list', verifyToken, listCart);

export default cartRouter;
