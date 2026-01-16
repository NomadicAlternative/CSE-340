const express = require('express');
const router = express.Router();// la constante router se crea utilizando el metodo Router de express para manejar rutas

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public")); 
router.use("/css", express.static(__dirname + "public/css"));// la constante router usa el metodo use para servir archivos estaticos desde la carpeta public/css cuando se accede a la ruta /css
router.use("/js", express.static(__dirname + "public/js"));// la constante router usa el metodo use para servir archivos estaticos desde la carpeta public/js cuando se accede a la ruta /js
router.use("/images", express.static(__dirname + "public/images"));// la constante router usa el metodo use para servir archivos estaticos desde la carpeta public/images cuando se accede a la ruta /images

module.exports = router;// la constante router se exporta para que pueda ser utilizada en otros archivos del proyecto



