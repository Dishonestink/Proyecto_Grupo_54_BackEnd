//Esquema NICOLAS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    id: {
        type:Number, 
    },
    asignatura: {
        type:String,
        require: true,
    },
    profesor: {
        type:String,
        require: true,
    },
    contenido: {
        type:String,
        require: false,
    },
    grado: {
        type:Number,
        require: true,
    },
    asistencia:{
        type:String,
        requiere:false
    }},{
        collection: "cursos"
    },
);

module.exports = mongoose.model("cursos",schema);