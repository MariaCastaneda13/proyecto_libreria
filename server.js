import express from "express";
import indexRoutes from "./rutas/Index.js";


const app = express();
  
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("<h1> Aquí encontrarás una gran variedad de libros de tus géneros favoritos </h1>");
});
//Endpoints
app.use("/api",indexRoutes);


app.listen(PORT, () => {
  console.log(`Leyendo en el puerto http://localhost:${PORT}`);
});
