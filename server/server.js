const express = require('express')
const cors = require("cors")
const app = express()
require('./connection/db')
const port = 5000;

const mascotasRoutes = require('./routes/mascotas.js')






//middleware
app.use(cors())
app.use(mascotasRoutes)


app.listen(port, () => {
    console.log(`LA APLICACION ESTA CORRIENDO EN EL PUERTO ${port}`)
})