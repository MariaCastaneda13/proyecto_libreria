import { Router } from "express";
import {io} from "../server.js";

const router = Router();

export const productManager=[];

router.get("/", (req, res) => {
  res.json(productManager);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

    const product = productManager.find((product)=>product.id===id);
    if(!product){
     return res.status(404).json({
      error: "Product not found",
    });
  }
  res.json(product);
});

router.post("/", (req, res) => {
  const { id, title, description, photo, price, code, stock } = req.body;

  if (!id|| !title || !description|| !photo || !price || !code || !stock) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  const productExists=productManager.find((product)=>product.id===Number(id));
  if(productExists){
    return res.status(404).json({
      error:"The product already exist",
      });
    }
const product ={
    id,
    title,
    description,
    photo,
    price,
    code,
    stock,
  };
productManager.push(product);

io.emit("products",productManager);
  res.status(201).json(product);
});

 router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product =req.body;

  const productDB=productManager.find((product)=>product.id===Number(id));

  if(!productDB){
    return res.status(404).json({error:"product not found"});
    }
    const index =productManager.indexOf(productDB);
    productManager[index]=product;
    io.emit("products",productManager);
    return res.json(product);
  });
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

    const productDB = productManager.find((product)=>product.id===Number(id));
    
    if (!productDB) {
      return res.status(404).json({
        error: "Product not found"});
    }
    const index=productManager.indexOf(productDB);
    productManager.splice(index,1);
    io.emit("products",productManager);
    return res.json ({error: "The product was deleted"});
  });
  export default router;
  