
import { Schema, model } from "mongoose";

const MoviesSchema = new Schema(
{
    titulo:{
        type : String
    },

    descripcion: {
        type:String
    },

    director:{
        type : String
    },

    genero:{
        type: String
    },

    anio:{
        type :Number
    },

    duracion : {
        type: Number
    },

    imagen:{
        type:String
    },
},{
    timestamps: true,
    strict: false
}
)
export default model("Movies", MoviesSchema)
