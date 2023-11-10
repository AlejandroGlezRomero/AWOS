// Importa las bibliotecas necesarias
import Sequelize from "sequelize";
import dotenv from "dotenv";

// Configura dotenv para cargar las variables de entorno desde el archivo .env en la carpeta src
//dotenv.config('src/.env');
//dotenv.config({path:"src/.env"})
dotenv.config({ path: 'src/.env' });

console.log(`user: ${process.env.BD_USER} \n bd:${process.env.BD_NAME} \n password: ${process.env.BD_PASSWORD}`);

// Crea una nueva instancia de Sequelize para la conexión a la base de datos
const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
  host: process.env.BD_HOST,   // Obtiene la dirección del host desde las variables de entorno
  port: "3309",                 // Puerto de conexión a la base de datos
  timezone: "America/Mexico_City", //uwuwu 
  dialect: "mysql",             // Usa MySQL como el dialecto para Sequelize
  define: { timestamps: true }, // Habilita el uso de timestamps para los modelos
  pool: {
    max: 5,                     // Número máximo de conexiones en el grupo de conexiones
    min: 0,                     // Número mínimo de conexiones en el grupo de conexiones
    acquire: 30000,             // Tiempo máximo, en milisegundos, que la conexión puede estar inactiva antes de ser liberada
    idle: 10000,                // Tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
    operatorsAliases: false,    // Deshabilita operadores de alias
  },
  //logging: false                // Deshabilita los mensajes de log de Sequelize
});

// Exporta la instancia de Sequelize configurada para su uso en otras partes de la aplicación
export default db;

