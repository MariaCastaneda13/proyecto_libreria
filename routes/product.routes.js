import { Router } from "express";
import { io } from "../server.js";

const router = Router();
export const productManager = [];

// Ruta para obtener todos los productos
router.get("/", (req, res) => {
  res.json(productManager);
});

// Ruta para obtener un producto por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = productManager.find((product) => product.id === Number(id));
  
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// Ruta para agregar un nuevo producto
router.post("/", (req, res) => {
  const { id, title, description, photo, price, code, stock } = req.body;

  if (!id || !title || !description || !photo || !price || !code || !stock) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const productExists = productManager.find((product) => product.id === Number(id));
  if (productExists) {
    return res.status(400).json({ message: "The product already exists" });
  }

  const product = { id: Number(id), title, description, photo, price, code, stock };
  productManager.push(product);

  io.emit("products", productManager);
  res.status(201).json(product);
});

// Ruta para actualizar un producto por ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const product = req.body;

  const productDB = productManager.find((product) => product.id === Number(id));
  if (!productDB) {
    return res.status(404).json({ error: "Product not found" });
  }

  const index = productManager.indexOf(productDB);
  productManager[index] = product;

  io.emit("products", productManager);
  res.json(product);
});

// Ruta para eliminar un producto por ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productDB = productManager.find((product) => product.id === Number(id));
  
  if (!productDB) {
    return res.status(404).json({ error: "Product not found" });
  }

  const index = productManager.indexOf(productDB);
  productManager.splice(index, 1);

  io.emit("products", productManager);
  res.json({ message: "The product was deleted" });
});

export default router;
