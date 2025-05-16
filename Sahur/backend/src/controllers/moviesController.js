//Array de metodos (C R U D)
const moviesController = {};
import moviesModel from "../models/movies.js";

// SELECT
moviesController.getmovies = async (req, res) => {
  const movies = await moviesModel.find();
  res.json(movies);
};

// INSERT
moviesController.createmovies = async (req, res) => {
  const { titulo, 
    descripcion, 
    director,
    genero, 
    anio, 
    duracion, 
    imagen  } = req.body;
  const newmovies = new moviesModel({ titulo, 
    descripcion, 
    director,
    genero, 
    anio, 
    duracion, 
    imagen });
  await newmovies.save();
  res.json({ message: "movie save" });
};

// DELETE
moviesController.deletemovies = async (req, res) => {
const deletedmovies = await moviesModel.findByIdAndDelete(req.params.id);
  if (!deletedmovies) {
    return res.status(404).json({ message: "movie dont find" });
  }
  res.json({ message: "movie deleted" });
};

// UPDATE
moviesController.updatemovies = async (req, res) => {
  // Solicito todos los valores
  const { titulo, 
    descripcion, 
    director,
    genero, 
    anio, 
    duracion, 
    imagen   } = req.body;
  // Actualizo
  await moviesModel.findByIdAndUpdate(
    req.params.id,
    {
        titulo, 
        descripcion, 
        director,
        genero, 
        anio, 
        duracion, 
        imagen 
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "customer update" });
};

export default moviesController;
