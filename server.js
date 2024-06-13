import express from "express";
import indexRoutes from "./rutas/Index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";


const app = express();

const PORT = 8080;
// Handlebars Configuration
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

//Rutas
app.get("/", (req, res) => { 
  const data={ name: "Maria"};
  res.render("inicio", data);
});
app.listen(PORT, ()=>{
  console.log(`Server running on Port http://localhost:${PORT}`);
  });