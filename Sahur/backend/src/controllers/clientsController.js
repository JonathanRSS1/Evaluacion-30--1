//Array de metodos (C R U D)
const clientsController = {};
import clientsModel from "../models/clients.js";

// SELECT
clientsController.getcustomers = async (req, res) => {
  const customers = await clientsModel.find();
  res.json(customers);
};

// INSERT
clientsController.createcustomers = async (req, res) => {
  const { nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    dui, } = req.body;
  const newcustomers = new clientsModel({ 
    nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    dui,});
  await newcustomers.save();
  res.json({ message: "customer save" });
};

// DELETE
clientsController.deletecustomers = async (req, res) => {
const deletedcustomers = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedcustomers) {
    return res.status(404).json({ message: "customer dont find" });
  }
  res.json({ message: "customer deleted" });
};

// UPDATE
clientsController.updatecustomers = async (req, res) => {
  // Solicito todos los valores
  const { nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    dui, } = req.body;
  // Actualizo
  await customersModel.findByIdAndUpdate(
    req.params.id,
    {
      nombre,
      correo,
      contrasenia,
      telefono,
      direccion,
      dui,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "customer update" });
};

export default clientsController;
