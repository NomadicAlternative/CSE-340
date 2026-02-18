const pool = require("../database/")

/* ***************************
 *  Add vehicle to favorites
 * ************************** */
async function addFavorite(account_id, inv_id) {
  try {
    const sql = `INSERT INTO public.favorites (account_id, inv_id) 
                 VALUES ($1, $2) 
                 ON CONFLICT (account_id, inv_id) DO NOTHING
                 RETURNING *`
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rows[0]
  } catch (error) {
    console.error("addFavorite error: " + error)
    return null
  }
}

/* ***************************
 *  Remove vehicle from favorites
 * ************************** */
async function removeFavorite(account_id, inv_id) {
  try {
    const sql = `DELETE FROM public.favorites 
                 WHERE account_id = $1 AND inv_id = $2
                 RETURNING *`
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rows[0]
  } catch (error) {
    console.error("removeFavorite error: " + error)
    return null
  }
}

/* ***************************
 *  Get all favorites by account_id with vehicle details
 * ************************** */
async function getFavoritesByAccountId(account_id) {
  try {
    const sql = `SELECT f.*, i.inv_id, i.inv_make, i.inv_model, i.inv_year, 
                        i.inv_price, i.inv_thumbnail, i.inv_miles, i.inv_color
                 FROM public.favorites f
                 JOIN public.inventory i ON f.inv_id = i.inv_id
                 WHERE f.account_id = $1
                 ORDER BY f.date_added DESC`
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    console.error("getFavoritesByAccountId error: " + error)
    return []
  }
}

/* ***************************
 *  Check if vehicle is in favorites
 * ************************** */
async function checkFavorite(account_id, inv_id) {
  try {
    const sql = `SELECT * FROM public.favorites 
                 WHERE account_id = $1 AND inv_id = $2`
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rowCount > 0
  } catch (error) {
    console.error("checkFavorite error: " + error)
    return false
  }
}

/* ***************************
 *  Get favorites count by account_id
 * ************************** */
async function getFavoritesCount(account_id) {
  try {
    const sql = `SELECT COUNT(*) as count FROM public.favorites WHERE account_id = $1`
    const result = await pool.query(sql, [account_id])
    return parseInt(result.rows[0].count)
  } catch (error) {
    console.error("getFavoritesCount error: " + error)
    return 0
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesByAccountId,
  checkFavorite,
  getFavoritesCount
}
