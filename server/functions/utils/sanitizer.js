const { body, validationResult } = require("express-validator");
const functions = require("firebase-functions");
const sanitizeBody = (req, res, next) => {
  functions.logger.info("Using Sanitizer", req.body);
  // Sanitize request body
  body("from").isDate().toDate();
  body("to").isDate().toDate();
  body("isAdmin").toBoolean();
  body("usedID").isString();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { sanitize: sanitizeBody };
