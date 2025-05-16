//Array de metodos (C R U D)
const employeeController = {};
import employeeModel from "../models/employee.js";

// SELECT
employeeController.getemployee = async (req, res) => {
  const employee = await employeeModel.find();
  res.json(employee);
};

// INSERT
employeeController.createemployee = async (req, res) => {
  const { nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    dui, } = req.body;
  const newemployee= new employeeModel({ nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    dui, });
  await newemployee.save();
  res.json({ message: "employee save" });
};

// DELETE
employeeController.deleteemployee = async (req, res) => {
const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedemployee) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "employee deleted" });
};

// UPDATE
employeeController.updateemployee = async (req, res) => {
  // Solicito todos los valores
  const { nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    dui, } = req.body;
  // Actualizo
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
      nombre,
      correo,
      contrasenia,
      telefono,
      direccion,
      puesto,
      fecha_contratacion,
      salario,
      dui,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "employee update" });
};

export default employeeController;
