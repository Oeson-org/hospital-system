// eslint-disable-next-line new-cap
const router = require("express").Router();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const response = require("../services/responses").responseFactory;
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
  const slot_id = uuidv4();
  const booking = {
    userID: userID,
    from: from,
    to: to,
    attendee: [],
  };
  booking["from"] = admin.firestore.Timestamp.fromDate(new Date(booking["from"]));
  booking["to"] = admin.firestore.Timestamp.fromDate(new Date(booking["to"]));
  functions.logger.log({ "ID": userID, "Feeding Data": booking });
  const bookingRef = await db.write("slots", slot_id, booking);
  res.status(200).json(response(
    "Slot created successfully",
    1,
    { slot_id: slot_id, booking: booking }
  ));
  functions.logger.info({ id: userID, slot: bookingRef });
};
router.post("/", checkAdmin, createBooking);
module.exports = router;
