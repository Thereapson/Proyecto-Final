//Archivo para la conexion a la base de datos
require("dotenv").config();
const mongoose = require('mongoose')
//Librería que nos sirve para esquematizar y conectar la base de datos

const dbConn = () => {
    const connectionString = process.env.DB_URI;
    // conexion a mongodb
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    //devuelve promesa
    .then(() => {
        console.log('Database connected to ATLAS')
    }).catch(err => {
        console.error('Connection Error: ',err)
    })
};

module.exports = { dbConn }