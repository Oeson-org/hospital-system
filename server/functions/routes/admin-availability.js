// eslint-disable-next-line new-cap
const router = require("express").Router();
const functions = require("firebase-functions");
const { v4: uuidv4 } = require("uuid");
const response = require("../res/responses").responseFactory;
const db = require("../services/db");
// Uses a request body like:
// { from: 2020-01-01<JS Date Type>, to: 2020-01-31<JS Date Type>,
// isAdmin: true<Boolean Type>, usedID: "userID"<String Type> }
const checkAdmin = (req, res, next) => {
  if (req.body.isAdmin === true) {
    next();
  } else {
    functions.logger.error("Not Admin account");
    res.status(200).json(response(
      "You are not authorized to perform this action",
      null,
      null
    ));
  }
};
const createBooking = async (req, res) => {
  const { from, to, userID } = req.body;
  functions.logger.info({ "Incoming Data": req.body });
  const booking = {
    createdBy: userID,
    from: from,
    to: to,
    attendee: [],
  };
  const id = uuidv4();
  functions.logger.log({ "ID": id, "Feeding Data": booking });
  const bookingRef = await db.write("bookings", id, booking);
  res.status(200).json(response(
    "Booking created successfully",
    1,
    { id: id, booking: bookingRef }
  ));
  functions.logger.info({ id: id, booking: bookingRef });
};
router.post("/", checkAdmin, createBooking);
module.exports = router;
