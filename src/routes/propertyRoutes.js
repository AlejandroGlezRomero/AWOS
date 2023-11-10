import express from "express";
import {
  formProperty,
  insertProperty,
  upadateProperty,
  deleteProperty,
  findAllByProperties,
  findAllProperties,
  findOneProperty,
} from "../controllers/propertyController.js";
const router = express.Router();

// Ruta para mostrar el formulario de creación de propiedades
router.get("/create", formProperty);


export default router;
