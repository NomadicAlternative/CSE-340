/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")// se importa el framework express para crear el servidor web
const expressLayouts = require("express-ejs-layouts")// se importa el modulo express-ejs-layouts para manejar layouts en las vistas ejs
const env = require("dotenv").config()// se importa el modulo dotenv para manejar variables de entorno desde un archivo .env
const app = express()// se crea una instancia de express para configurar el servidor web
const static = require("./routes/static")// se importa el archivo de rutas static.js para manejar archivos estaticos
const baseController = require("./controllers/baseController")// se importa el controlador baseController.js para manejar rutas basicas
const inventoryRoute = require("./routes/inventoryRoute")// se importa el archivo de rutas inventoryRoute.js para manejar rutas de inventario
const accountRoute = require("./routes/accountRoute")// se importa el archivo de rutas accountRoute.js para manejar rutas de cuenta
const utilities = require("./utilities/")// se importa el modulo utilities para funciones de utilidad
const session = require("express-session")// se importa el modulo express-session para manejar sesiones de usuario
const bodyParser = require("body-parser")// se importa body-parser para leer datos del cuerpo de la solicitud
const pool = require('./database/') // se importa el modulo para manejar la conexion a la base de datos

/* ***********************
 * View Engine and Templates
 *************************/

/* ***********************
 * Middleware
 * ************************/
 app.use(session({
  store: new (require('connect-pg-simple')(session))({ 
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))


// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)

// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inv", inventoryRoute)

// Account routes
app.use("/account", accountRoute)

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  let message = err.status == 404 ? err.message : 'Oh no! There was a crash. Maybe try a different route?'
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})



/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 5500
const host = '0.0.0.0' // Must be 0.0.0.0 for Render

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
