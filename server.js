import express from "express";
import productRoute from "./rutas/products.js";

const app = express();
  
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1> Aquí encontrarás una gran variedad de libros de tus géneros favoritos </h1>");
});
app.use("/api/products", productRoute);

app.listen(PORT, () => {
  console.log(`Leyendo en el puerto http://localhost:${PORT}`);
});