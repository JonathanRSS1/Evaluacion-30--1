// Importar el modelo
import employeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js";
import employeeController from "./employeesController.js";

// creamos un array de funciones
const registerEmployeeController = {};

registerEmployeeController.register = async(req, res)=> {
    // Pedir todos los datos que vamos a guardar
    const {nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        dui,
    } = req.body;

    try {
        // 1- Verificamos si el empleado ya existe
        const existEmployee = await employeeModel.findOne({correo})
        if(existEmployee) {
            return res.json({message: "Employee already exist"})
        } 

        // 2- Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(contrasenia, 10)

        //3- Guardar todo en la tabla Empleados
        const newEmployee = new employeeModel({
            nombre,
            correo,
            contrasenia :  passwordHash,
            telefono,
            direccion,
            puesto,
            fecha_contratacion,
            salario,
            dui,
        })

        await newEmployee.save();

        //TOKEN
        jsonwebtoken.sign(
            //1- Que voy a guardar
            {id: newEmployee._id},
            //2- secreto
            config.JWT.secret,
            //3- Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- funcion flecha
            (error, token) =>{
                if(error) console.log("error"+error)
                
                res.cookie("authToken", token)
                res.json({message: "Employee saved"})
            }
        )

    } catch (error) {
        console.log("error"+error)
        res.json({message: "Error saving employee"})
    }
} 

export default registerEmployeeController;
