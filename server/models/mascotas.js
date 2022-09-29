const mongoose = require('mongoose')
const validator = require('validator')


const mascotaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:[true,'el nombre es requerido'],
        minlength:[3, "minimo 3 letras"]
    },
    especie:{
        type:String,
        required:[true,'el nombre es requerido'],
        minlength:[3, "minimo 3 letras"]
    },
    sexo: {
        type:String,
        required:[true,'el nombre es requerido'],
        minlength:[3, "minimo 3 letras"]
    },
    telefonoDueño:{
        type:String,
        required:[true,'el nombre es requerido'],
        minlength:[3, "minimo 3 letras"]
    },
    mailDueño:{
        type:String,
        validate(value){
           if(!validator.isEmail(value)){
                throw new Error(" el email es invalido")
           }
        }
    },
    fotoMascota:{
        data:Buffer,
        contentType:String
    },
    descripcionMascota:{
        type:String,
        required:[true,'el nombre es requerido'],
        minlength:[3, "minimo 3 letras"]
    },
    tamañoMascota:{
        type:String,
        required:[true,'el nombre es requerido'],
        minlength:[3, "minimo 3 letras"]
    }
})

module.exports = (mongoose.model("Mascota",mascotaSchema))