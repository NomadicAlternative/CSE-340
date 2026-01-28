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

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)

// Index Route es la ruta principal que se carga cuando se accede a la raiz del sitio web
app.get("/", function (req, res) {
  res.render("index", { title: "Home" })
})

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
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
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
