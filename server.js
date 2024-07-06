import express from "express";
import{Server} from "socket.io";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";
import productRoutes, {productManager} from "./routes/product.routes.js";
import path from "path";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname,"./public")));

// Handlebars 
app.engine(
  "hbs",
  handlebars.engine({
      extname: "hbs",
      defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//Rutas
app.use("/", viewsRoutes);
app.use("/api/products", productRoutes);


const server=app.listen(PORT, ()=>{
  console.log(`Server running on Port http://localhost:${PORT}`);
  });

//Socket.io
export const io=new Server(server);
io.on("connection", (socket)=>{
  console.log("New client connected",socket.id);
socket.emit("productManager",productManager);
});
