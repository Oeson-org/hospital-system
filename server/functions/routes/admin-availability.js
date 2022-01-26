const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const functions = require("firebase-functions");
const { v4: uuidv4 } = require("uuid");
const response = require("../res/responses");
const db = require("../utils/sanitizer");
// Uses a request body like:
// { from: 2020-01-01<JS Date Type>, to: 2020-01-31<JS Date Type>,
// isAdmin: true<Boolean Type>, usedID: "userID"<String Type> }
const checkAdmin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  else if (req.body.isAdmin === true) {
    next();
  } else {
    functions.logger.info("Not Admin account");
    response.responseFactory(
      "You are not authorized to perform this action",
      null,
      null
    );
  }
};
const createBooking = (req, res) => {
  const { from, to, userID } = req.body;
  const booking = {
    createdBy: userID,
    from: from.toDate(),
    to: to.toDate(),
    attendee: [],
  };
  const id = uuidv4();
  const bookingRef = db("bookings", id, booking);
  bookingRef
    .set(booking)
    .then(() => {
      response.responseFactory(
        "Booking created successfully",
        1,
        id
      );
    })
    .catch((err) => {
      response.responseFactory("Error creating booking", null, null);
    });
  functions.logger.info({ id: id, booking: bookingRef });
};
router.post("/", body("from").isDate().toDate(),
  body("to").isDate().toDate(),
  body("isAdmin").toBoolean(),
  body("usedID").isString(), checkAdmin, createBooking);
module.exports = router;
