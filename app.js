const express = require('express');
const app = express();
const productsRouter = require('./rutas/products');
const cartsRouter = require('./rutas/carts');

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
  console.log('El servidor está listo en el puerto 8080');
});
