import express from "express";
import clientsController from "../controllers/clientsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(clientsController.getcustomers)
  

router
  .route("/:id")
  .put(clientsController.updatecustomers)
  .delete(clientsController.deletecustomers);

export default router;
