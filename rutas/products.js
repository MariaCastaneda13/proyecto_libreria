import { Router } from "express";
import{productManager} from "../Managers/ProductManager.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(productManager.getProducts());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const product = productManager.getProductById(id);

    res.json(product);
  } catch (error) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
});

router.post("/", async (req, res) => {
  const { title, price, photo, code, stock } = req.body;

  if (!title || !price || !photo || !code || !stock) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  const product = new Product(
    title,
    price,
    photo,
    code,
    stock
  );

  try {
    await productManager.addProduct(product);

    res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({
      error: `Could not add the product: ${error.message}`,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, photo, code, stock, status } =
    req.body;

  try {
    const product = productManager.getProductById(Number(id));

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    await productManager.updateProduct(id, {
      title,
      price,
      photo,
      code,
      stock,
      status,
    });

    const newProduct = productManager.getProductById(Number(id));

    res.json(newProduct);
  } catch (error) {
    return res.status(400).json({
      error: `Could not update the product: ${error.message}`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = productManager.getProductById(Number(id));

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    await productManager.deleteProduct(Number(id));

    res.json(product);
  } catch (error) {
    return res.status(400).json({
      error: `The product was unable to remove: ${error.message}`,
    });
  }
});

export default Router;