import { Router } from 'express';
import ProductsManager from '../data/productManager.js';

const router = Router();

router.get('/', async (req, res) => {
    const products = await ProductsManager.read();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await ProductsManager.readOne(req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

router.post('/', async (req, res) => {
    const product = await ProductsManager.create(req.body);
    if (product) {
        res.status(201).json(product);
    } else {
        res.status(400).json({ error: 'Invalid product data' });
    }
});

router.put('/:pid', async (req, res) => {
    const updatedProduct = await ProductsManager.update(req.params.pid, req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Product not found or invalid data' });
    }
});

router.delete('/:pid', async (req, res) => {
    const result = await ProductsManager.destroy(req.params.pid);
    if (result) {
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

export default router;
