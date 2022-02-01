// eslint-disable-next-line new-cap
const router = require("express").Router();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const dayjs = require('dayjs')
const response = require("../services/responses").responseFactory;
const db = require("../services/db");
const log = require("../services/logger").log;
// Uses a request body like:
// { from: 2020-01-01<JS Date Type>, to: 2020-01-31<JS Date Type>,
// isAdmin: true<Boolean Type>, usedID: "userID"<String Type> }
const checkAdmin = (req, res, next) => {
  if (req.body.isAdmin === true) {
    next();
  } else {
    log("error", "Not Admin account");
    res.status(200).json(response(
      "You are not authorized to perform this action",
      null,
      null
    ));
  }
};
function generateSlotMap(start, end, span, gap) {
  if(!start) return {}
 let slots = { [start]: null };
 let lastSlot = dayjs(end).subtract(span + gap, "minute").toJSON();
 while (lastSlot > start) {
     let nextStart = dayjs(start)
         .add(span + gap, "minute")
         .toJSON();
     slots[nextStart] = null;
     start = nextStart;
 }
 return slots;
}
const createBooking = async (req, res) => {
  const { date, slotspan, starttime, endtime } = req.body;
  log("info", { "Incoming Data": req.body });
  const slot_id = uuidv4();
  slots = generateSlotMap(starttime, endtime, slotspan, 0);
  const booking = {
    slot_id,
    date,
    slotspan,
    slots,
    starttime,
    endtime,
    appnmnt_id: ""
  };
  booking["date"] = admin.firestore.Timestamp.fromDate(new Date(booking["date"]));
  booking["startitme"] = admin.firestore.Timestamp.fromDate(new Date(booking["starttime"]));
  booking["endtime"] = admin.firestore.Timestamp.fromDate(new Date(booking["endtime"]));
  log("log", { "ID": userID, "Feeding Data": booking });
  const bookingRef = await db.write("slots", slot_id, booking);
  res.status(200).json(response(
    "Slot created successfully",
    1,
    { slot_id: slot_id, booking: booking }
  ));
  log("info", { id: userID, slot: bookingRef });
};
router.post("/", checkAdmin, createBooking);
module.exports = router;
