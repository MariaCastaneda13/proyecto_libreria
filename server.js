import express from "express";
import indexRoutes from "./rutas/Index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import path from "path";
import viewsRutas from "./rutas/views.rutas.js"
import{Server} from "socket.io";

const app = express();

const PORT = 8080;
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

//Endpoints
app.use("/api", indexRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname,"./public")));

//Rutas
app.get("/", (req, res) => { 
  const data={ name: "Maria"};
  res.render("index", data);
});
app.use("/", viewsRutas);


const httpServer=app.listen(PORT, ()=>{
  console.log(`Server running on Port http://localhost:${PORT}`);
  });

  //Socket.io
const io=new Server(httpServer);
io.on("connection", (socket)=>{
  console.log("Nuevo cliente conectado",socket.id);
});