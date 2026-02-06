const utilities = require("./")
const { body, validationResult } = require("express-validator")
const invValidate = {}

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
invValidate.classificationRules = () => {
  return [
    // classification_name is required and must be alphanumeric only
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a classification name.")
      .isAlphanumeric()
      .withMessage("Classification name must contain only letters and numbers, no spaces or special characters."),
  ]
}

/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
invValidate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
      errors: errors.array(),
      title: "Add New Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
invValidate.inventoryRules = () => {
  return [
    // classification_id is required
    body("classification_id")
      .trim()
      .notEmpty()
      .withMessage("Please select a classification."),

    // inv_make is required and must be at least 3 characters
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a make.")
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters."),

    // inv_model is required and must be at least 3 characters
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a model.")
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters."),

    // inv_year is required and must be a 4-digit year
    body("inv_year")
      .trim()
      .notEmpty()
      .withMessage("Please provide a year.")
      .isInt({ min: 1900, max: 2099 })
      .withMessage("Year must be between 1900 and 2099."),

    // inv_description is required
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a description."),

    // inv_image is required
    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Please provide an image path."),

    // inv_thumbnail is required
    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Please provide a thumbnail path."),

    // inv_price is required and must be a positive number
    body("inv_price")
      .trim()
      .notEmpty()
      .withMessage("Please provide a price.")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),

    // inv_miles is required and must be a positive integer
    body("inv_miles")
      .trim()
      .notEmpty()
      .withMessage("Please provide mileage.")
      .isInt({ min: 0 })
      .withMessage("Miles must be a positive whole number."),

    // inv_color is required
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a color."),
  ]
}

/* ******************************
 * Check data and return errors or continue to add inventory
 * ***************************** */
invValidate.checkInventoryData = async (req, res, next) => {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(classification_id)
    res.render("./inventory/add-inventory", {
      errors: errors.array(),
      title: "Add New Vehicle",
      nav,
      classificationList,
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    })
    return
  }
  next()
}

module.exports = invValidate
