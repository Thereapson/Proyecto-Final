//Archivo que arranca el servidor 
require("dotenv").config();
const express = require('express');

const morgan = require('morgan');
//morgan permite ver las peticiones en consola

const cors = require('cors');

//cors permite comunicar el servidor y el frontend 
const cookieParser = require('cookie-parser')
const routes = require('./Routes/index')
//const { getAllData } = require('./Helpers/categoryLoader')
//const { idProductsToUpdate } =require('./Helpers/productsLoader')
const { dbConn } = require("./db.js")
//coneccion a la DB

const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(cors());
app.use(cookieParser())
app.use('/', routes)

// Error catching endware.
app.use((error, req, res, next) => {
    console.log("Error en ruta app", error)
    const name = error.name
    const message = error.message;
    // console.error(error);
    res.status(400).send(name + message);
});
app.use(
    cors({
      origin: '*', //react
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
      allowedHeaders:
        "X-Requested-With, x-auth-token, X-HTTP-Method-Override, Content-Type, Accept, access-control-allow-credentials",
    })
  );
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin: *"); // update to match the domain you will make the request from
  
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "X-AUTH-TOKEN, Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
{ // puerto 3001
    console.log('Server listening on port 3001'); // eslint-disable-line no-console
});

dbConn();
//getAllData();
//idProductsToUpdate()
