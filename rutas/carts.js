import { Router } from 'express';
import CartsManager from '../data/cartsManager.js';

const router = Router();

//Crea un nuevo carrito
router.post('/', async (req, res) => {
    const cart = await CartsManager.create();
    res.status(201).json(cart);
});
//Se obtienen los productos del carrito
router.get('/:cid', async (req, res) => {
    const cart = await CartsManager.readOne(req.params.cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});
//Se añaden productos al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cart = await CartsManager.addProduct(req.params.cid, req.params.pid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Cart or product not found' });
    }
});

export default router;
