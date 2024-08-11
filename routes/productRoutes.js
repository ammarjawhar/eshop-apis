import express from 'express';
import {
  addProduct,
  listAllProdcuts,
  removeProduct,
  newCollections,
  popular,
  relatedProducts,
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', addProduct);
productRouter.post('/delete', removeProduct);
productRouter.get('/list', listAllProdcuts);
productRouter.get('/newcollection', newCollections);
productRouter.get('/popular', popular);
productRouter.post('/related', relatedProducts);

export default productRouter;
