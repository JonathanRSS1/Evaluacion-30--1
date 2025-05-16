import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    nombre: {
        type: String,
        require: true,
      },
  
      correo: {
        type: String,
      },
  
      contrasenia: {
        type: String,
        require: true,
      },
  
      telefono:{
          type:String
      },
  
      direccion:{
          type: String
      },

      puesto:{
        type : String
      },

      fecha_publicacion: {
        type : Date
      },

      salario:{
        type: Number
      },
  
      dui:{
          type:String
      },
  
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", employeeSchema);
