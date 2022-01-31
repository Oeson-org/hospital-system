const router = require("express").Router();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const response = require("../services/responses").responseFactory;
const db = require("../services/db");
const log = require("../services/logger").log;
const checkRequest = (req, res, next) => {
    if (req.query.from && req.query.to) {
        next();
    } else {
        res.status(400).json(response("Invalid Request"));
    }
}

const findBooking = async (req, res, next) => {
    let from = req.query.from;
    let to = req.query.to;
    try {
        from = admin.firestore.Timestamp.fromDate(new Date(from));
        to = admin.firestore.Timestamp.fromDate(new Date(to));
    } catch (err) {
        log("debug", "couldnot create timestamp");
    }
    log("info", { from: from.valueOf(), to: to.valueOf() });
    res.status(200).json(response("Booking found", 1, "ok"));
    // Finding booking based on a condition
    //TODO: Add condition to find booking
    let condition = from.valueOf() <= doc.data().from.valueOf() && to.valueOf() >= doc.data().to.valueOf();
    const booking = await db.read("slots", null, condition);
}
// request will be in the form /?from="Date"&to="Date"
router.get("/", checkRequest, findBooking);
module.exports = router;