// Needed Resources
const express = require("express")
const router = new express.Router()
const favoritesController = require("../controllers/favoritesController")
const utilities = require("../utilities/")

// Route to build favorites view
router.get("/", utilities.checkLogin, utilities.handleErrors(favoritesController.buildFavorites))

// Route to add to favorites (AJAX)
router.post("/add/:inv_id", utilities.checkLogin, utilities.handleErrors(favoritesController.addToFavorites))

// Route to remove from favorites (AJAX)
router.post("/remove/:inv_id", utilities.checkLogin, utilities.handleErrors(favoritesController.removeFromFavorites))

// Route to remove from favorites (Form POST)
router.post("/remove", utilities.checkLogin, utilities.handleErrors(favoritesController.removeFavoritePost))

// Route to check if vehicle is favorite (AJAX)
router.get("/check/:inv_id", utilities.checkLogin, utilities.handleErrors(favoritesController.checkFavorite))

module.exports = router
