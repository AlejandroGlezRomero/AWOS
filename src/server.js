import express from "express";
import generalRoutes from "./routes/generalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import db from "./config/db.js";
import { User, Category, Price, Property } from "./models/relationShips.js";
import Seller from "./models/Seller.js";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { homePage } from "./controllers/userController.js";
dotenv.config({ path: "src/.env" });
import propertyRoutes from "./routes/propertyRoutes.js";
dotenv.config({ path: "src/.env" });
// Crear la app
const app = express();

//Abilitar el uso de  cookies

try {
  await db.authenticate();
  await db.sync({ force: true }); // Usar force: true solo durante el desarrollo
  console.log("Conexión a la base de datos exitosa");
} catch (error) {
  console.error("Error de conexión a la base de datos:", error);
}


app.set("view engine", "pug"); //Le dice al Servidor que lo que se va a agtregar y a utilizar en este caso es PUG.
app.set("views", "./src/views"); //Estamos definiendo en donde estarán las vistas.

//Carpeta Pública.
app.use(express.static("./src/public"));
//Permitimos la lectura de datos a traves de los elementos HTML.
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://unpkg.com",
        "https://cdnjs.cloudflare.com",
        "'unsafe-eval'",
      ],
      styleSrc: [
        "'self'",
        "https://unpkg.com",
        "https://cloudflare.com",
        "https://cdnjs.cloudflare.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://unpkg.com",
        "https://cloudflare.com",
        "https://cdnjs.cloudflare.com",
        "https://a.tile.openstreetmap.org",
        "https://b.tile.openstreetmap.org",
        "https://c.tile.openstreetmap.org",
      ],
      connectSrc: [
        "'self'",
        "https://tile-provider-domain.com",
        "https://geocode.arcgis.com",
      ],
    },
  })
);

//Cookie-parser
app.use(cookieParser());

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(process.env.SERVER_PORT, (request, response) => {
  // Imprimir un mensaje en la consola indicando el puerto en el que está funcionando el servidor
  //Le indicamos a la instancia de express que comience a escuchar las peticiones
  console.log(
    `El servicio HTTP A iniciado.... \nEl servidor está funcionando en el puerto ${process.env.SERVER_PORT}`
  );
});

app.use("/login", userRoutes);
app.use("/", generalRoutes);
app.use("/home", homePage);
app.use("/property", propertyRoutes);
