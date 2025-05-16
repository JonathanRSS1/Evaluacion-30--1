/*
    Campos:
        nombre
        descripcion
        precio
        stock
*/

import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    nombre: {
      type: String,
      
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

    dui:{
        type:String
    },

  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("clients", clientsSchema);
