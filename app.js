import express from 'express';
import productsRouter from './rutas/products.js';
import cartsRouter from './rutas/carts.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
