const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    Nombre: {
        type:String,
        require: true,
    },
    Identificación: {
        type:Number, 
    },
    Situación: {
        type:String,
        require: true,
    },
    Grado: {
        type:Number,
        require: true,
    },
    Calificaciones:{
        type:String,
        requiere:false
    }},{
        collection: "Estudiantes"
    },
);

module.exports = mongoose.model("Estudiantes",schema);