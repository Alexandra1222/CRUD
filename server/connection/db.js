const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/CRUD_GUARDERIA_ANIMAL')
.then(()=>console.log('la conexion a la base de datos es exitosa'))
.catch((err)=> console.log('error al conectarse a la base de datos: ' (err)))