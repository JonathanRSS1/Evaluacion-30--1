import express from "express";
import moviesController from "../controllers/moviesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(moviesController.getmovies)
  .post(moviesController.createmovies);

router
  .route("/:id")
  .put(moviesController.updatemovies)
  .delete(moviesController.deletemovies);

export default router;
