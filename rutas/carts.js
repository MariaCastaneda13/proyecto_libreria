import { Router } from 'express';
import CartsManager from '../data/cartsManager.js';

const router = Router();

router.post('/', async (req, res) => {
    const cart = await cartsManager.create();
    res.status(201).json(cart);
});

router.get('/:cid', async (req, res) => {
    const cart = await CartsManager.readOne(req.params.cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cart = await cartsManager.addProduct(req.params.cid, req.params.pid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Cart or product not found' });
    }
});

export default router;
