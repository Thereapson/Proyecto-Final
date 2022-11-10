
//Archivo que arranca el servidor 
require("dotenv").config();
const express = require('express');

const morgan = require('morgan');//morgan permite ver las peticiones en consola

const cors = require('cors');//cors permite comunicar el servidor y el frontend 
const { ServerApiVersion } = require('mongodb');
const cookieParser = require('cookie-parser');
const routes = require('./Routes/index');
const { dbConn } = require("./db.js");//coneccion a la DB
const { default: mongoose } = require("mongoose");

const app = express();
const port = process.env.PORT;
const db = process.env.DB_URI;
const host = process.env.HOST || '0.0.0.0';

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
    origin: process.env.CORS_URL, //react
    methods: "GET,POST,PUT,DELETE",
    withCredentials: true,
    allowedHeaders:
      "X-Requested-With, x-auth-token, X-HTTP-Method-Override, Content-Type, Accept, access-control-allow-credentials",
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "X-AUTH-TOKEN, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const connectDB = () => {
  try {
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
    app.listen(port, host, () => {
      console.log(`Server on port ${port} and connected to ATLAS DB 🔌`)
    })

  } catch (error) {
    console.log('Error al conectar a la db 🚫')
    console.error(error.message)
    process.exit(1)
  }
};

connectDB();