import { Router } from "express";
import productRoute from "./products.js";
import cartRoute from "./carts.js"

const router = Router();

router.use("/products", productRoute);
router.use("/carts", cartRoute);

export default router;