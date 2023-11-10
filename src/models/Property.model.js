import { DataTypes } from "sequelize";
import db from '../config/db.js';
import { Sequelize } from 'sequelize';

// Configuración de la instancia Sequelize
const sequelize = new Sequelize('localhost', 'rs_alejandro', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    useUTC: false,
  },
  timezone: '-06:00', // Establece la zona horaria como (GMT-6)
});


const Property = db.define("tbb_properties", {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255), // Puedes usar TEXT para descripciones largas
    required: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Utiliza DECIMAL para almacenar precios
    allowNull: false,
  },
});

export default Property;
