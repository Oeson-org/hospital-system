const router = require("express").Router();
const response = require("../services/responses").responseFactory;
const db = require("../services/db");
const log = require("../services/logger").log;

const checkRequest = (req, res, next) => {
    if (req.query.date) {
        next();
    } else {
        res.status(400).json(response("Invalid Request"));
    }
}

const findBooking = async (req, res, next) => {
    let date = req.query.date;
    log("info", { date: date });
    // Finding booking based on a condition
    //TODO: Add condition to find booking
    //let condition = { key: "date", operator: '==', value: date };
    try {
        let booking = await db.read("slots", date);
        log("info", { booking: booking });
        res.status(200).json(response("Slots found", 1, booking.data._fieldsProto));
    } catch (err) {
        log("error", { error: err });
        res.status(500).json(response("Slots not found"));
    }
}
// request will be in the form /?date="Date"
router.get("/", checkRequest, findBooking);
module.exports = router;