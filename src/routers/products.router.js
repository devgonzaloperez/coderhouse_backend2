import Router from "koa-router"; //Se instaló con npm install koa-router.
import { createProduct, deleteProductByID, getAllProducts, getProductById, updateProduct } from "../controllers/products.controllers.js";

export const productsRouter = new Router({
    prefix:"/api/productos"
});

productsRouter.get('/', getAllProducts); 
productsRouter.get('/:id', getProductById);
productsRouter.post('/', createProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.delete('/:id', deleteProductByID);