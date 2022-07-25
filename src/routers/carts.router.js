import express from "express";
import { addProductByIDtoCartByID, createCart, deleteCartByID, deleteProductByIDFromCartByID, getAllCartProductsByID } from "../controllers/carts.controller.js";
import { isUserOrAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

router.post('/', [isUserOrAdmin], createCart);
router.delete('/:id', [isUserOrAdmin], deleteCartByID);
router.get('/:id/productos', [isUserOrAdmin], getAllCartProductsByID);
router.post('/:id/productos/:id_prod', [isUserOrAdmin], addProductByIDtoCartByID);
router.delete('/:id/productos/:id_prod', [isUserOrAdmin], deleteProductByIDFromCartByID);

export default router;