//Importamos los modelos
import customersModel from "../models/clients.js";
import employeesModel from "../models/employee.js";
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // generar token
import { config } from "../config.js";

// Array de funciones
const loginController = {};

loginController.login = async (req, res) => {
  // Pedimos las cosas con los nombres correctos
  const { correo, contrasenia } = req.body;

  try {
    // Validamos los 3 posibles niveles
    // 1. Admin, 2. Empleado, 3. Cliente

    let userFound; // Guarda el usuario encontrado
    let userType; // Guarda el tipo de usuario encontrado

    // 1. Admin
    if (
      correo === config.ADMIN.emailAdmin &&
      contrasenia === config.ADMIN.password
    ) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      // 2. Empleados
      userFound = await employeesModel.findOne({ correo });
      userType = "employee";
      if (!userFound) {
        // 3. Cliente
        userFound = await customersModel.findOne({ correo });
        userType = "customer";
      }
    }

    // Si no encontramos a ningún usuario con esas credenciales
    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Validar la contraseña
    // SOLO SI NO ES ADMIN
    if (userType !== "admin") {
      // Usar el campo correcto de contraseña según el modelo
      const isMatch = await bcryptjs.compare(contrasenia, userFound.contrasenia);
      if (!isMatch) {
        return res.json({ message: "Invalid password" });
      }
    }

    //// TOKEN
    // Para validar que inició sesión
    jsonwebtoken.sign(
      // 1- Qué voy a guardar
      { id: userFound._id, userType },
      // 2- Secreto
      config.JWT.secret,
      // 3- Cuándo expira
      { expiresIn: config.JWT.expiresIn },
      // 4. Función flecha
      (error, token) => {
        if (error) {
          console.log("error" + error);
          return res.status(500).json({ message: "Error generating token" });
        }
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24, // 1 día, ajusta según config.JWT.expiresIn
        });
        res.json({ message: "Login successful" });
      }
    );
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Server error" });
  }
};

export default loginController;
