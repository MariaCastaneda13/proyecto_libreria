import { Router } from "express";
import {cartManager} from "../Managers/cartManager.js";

const router = Router();

//Crea un nuevo carrito
router.post('/', async (req, res) => {
    try{
        await cartManager.createCart();
        res.status(201).json({ message: "The cart was created correctly" });
      } catch (error) {
        res.status(400).json({ error: `The cart could not be created: ${error}` });
      }
    });
    
    router.get("/:id", async (req, res) => {
      const { id } = req.params;
    
      try {
        const cart = await cartManager.getCart(Number(id));
    
        if (!cart) {
          return res.status(404).json({ error: "The cart does not exist" });
        }
    
        res.status(200).json(cart);
      } catch (error) {
        res.status(400).json({ error: `Unable to obtain cart: ${error}` });
      }
    });
    
    router.post("/:id/product/:productId", async (req, res) => {
      const { id, productId } = req.params;
    
      try {
        await cartManager.addProductToCart(Number(id), Number(productId));
    
        res.status(201).json({ message: "Product added to cart" });
      } catch (error) {
        res
          .status(400)
          .json({ error: `Product could not be added to cart: ${error}` });
      }
    });
    
    export default router;