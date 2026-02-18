const utilities = require("../utilities/")
const favoritesModel = require("../models/favorites-model")

const favCont = {}

/* ***************************
 *  Build favorites view
 * ************************** */
favCont.buildFavorites = async function (req, res, next) {
  let nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  const favorites = await favoritesModel.getFavoritesByAccountId(account_id)
  const favoritesGrid = await utilities.buildFavoritesGrid(favorites)
  
  res.render("account/favorites", {
    title: "My Favorites",
    nav,
    errors: null,
    favoritesGrid,
    favoritesCount: favorites.length
  })
}

/* ***************************
 *  Add to favorites (AJAX)
 * ************************** */
favCont.addToFavorites = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  const account_id = res.locals.accountData.account_id
  
  const result = await favoritesModel.addFavorite(account_id, inv_id)
  
  if (result) {
    res.json({ success: true, message: "Added to favorites!" })
  } else {
    res.json({ success: false, message: "Failed to add to favorites." })
  }
}

/* ***************************
 *  Remove from favorites (AJAX)
 * ************************** */
favCont.removeFromFavorites = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  const account_id = res.locals.accountData.account_id
  
  const result = await favoritesModel.removeFavorite(account_id, inv_id)
  
  if (result) {
    res.json({ success: true, message: "Removed from favorites!" })
  } else {
    res.json({ success: false, message: "Failed to remove from favorites." })
  }
}

/* ***************************
 *  Remove from favorites (Form POST - for favorites page)
 * ************************** */
favCont.removeFavoritePost = async function (req, res, next) {
  const inv_id = parseInt(req.body.inv_id)
  const account_id = res.locals.accountData.account_id
  
  const result = await favoritesModel.removeFavorite(account_id, inv_id)
  
  if (result) {
    req.flash("notice", "Vehicle removed from favorites.")
  } else {
    req.flash("warning", "Failed to remove from favorites.")
  }
  res.redirect("/favorites/")
}

/* ***************************
 *  Check if vehicle is favorite (AJAX)
 * ************************** */
favCont.checkFavorite = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  const account_id = res.locals.accountData.account_id
  
  const isFavorite = await favoritesModel.checkFavorite(account_id, inv_id)
  
  res.json({ isFavorite })
}

module.exports = favCont
