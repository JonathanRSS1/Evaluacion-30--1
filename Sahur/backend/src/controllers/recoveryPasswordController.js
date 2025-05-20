import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar

import clientsModel from "../models/clients.js";
import employeesModel from "../models/employee.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";

//1- Crear un array de funciones
const passwordRecoveryController = {};

// SOLICITAR CÓDIGO
passwordRecoveryController.requestCode = async (req, res) => {
  const { correo } = req.body; // <- cambiado de 'email' a 'correo'

  try {
    let userFound;
    let userType;

    userFound = await clientsModel.findOne({ correo });
    if (userFound) {
      userType = "client";
    } else {
      userFound = await employeesModel.findOne({ correo });
      if (userFound) {
        userType = "employee";
      }
    }

    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const token = jsonwebtoken.sign(
      { correo, code, userType, verified: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    await sendEmail(
      correo,
      "You verification code",
      "Hello! Remember don't forget your pass",
      HTMLRecoveryEmail(code)
    );

    res.json({ message: "Correo enviado" });
  } catch (error) {
    console.log("error" + error);
  }
};

// VERIFICAR CÓDIGO
passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (decoded.code !== code) {
      return res.json({ message: "Invalid code" });
    }

    const newToken = jsonwebtoken.sign(
      {
        correo: decoded.correo,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });

    res.json({ message: "Code verified successfully" });
  } catch (error) {
    console.log("error" + error);
  }
};

// CAMBIAR CONTRASEÑA
passwordRecoveryController.newPassword = async (req, res) => {
  const { nuevaContrasenia } = req.body; // <- cambiado de 'newPassword'

  try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (!decoded.verified) {
      return res.json({ message: "Code not verified" });
    }

    const { correo, userType } = decoded;

    const hashedPassword = await bcryptjs.hash(nuevaContrasenia, 10);

    let updatedUser;

    if (userType === "client") {
      updatedUser = await clientsModel.findOneAndUpdate(
        { correo },
        { contrasenia: hashedPassword }, // <- corregido campo
        { new: true }
      );
    } else if (userType === "employee") {
      updatedUser = await employeesModel.findOneAndUpdate(
        { correo },
        { contrasenia: hashedPassword }, // <- corregido campo
        { new: true }
      );
    }

    res.clearCookie("tokenRecoveryCode");

    res.json({ message: "Password updated" });
  } catch (error) {
    console.log("error" + error);
  }
};

export default passwordRecoveryController;
