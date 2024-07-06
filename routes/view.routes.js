import { Router } from "express";
import { productManager } from "../managers/ProductManager.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {productManager});
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;