const router = require("express").Router();
const response = require("../services/responses").responseFactory;
const db = require("../services/db");
const { v4: uuidv4 } = require("uuid");
const logger = require("../services/logger");
const checkRequest = (req, res, next) => {
    // time should be in 24 hours format hh:mm:ss
    // like 08:45:00
    if (req.body.date && req.body.time && req.body.name && (req.body.email || req.body.phone) && req.body.message) {
        next();
    } else {
        res.status(400).json(response("Insufficient Data"));
    }
}
const checkSlotifAvailable = async (req, res, next) => {
    let { date, time } = req.body;
    logger.log("info", { date: date, time: time });

    let appoinment = await db.find("slots", date, time);
    if (appoinment.data) {
        logger.log("info", { appoinment: appoinment });
        res.locals.appnmnt = appoinment.data;
        next();
        //res.status(200).json(response("Slot found for booking", 1, appoinment.data));
    }
    else {
        logger.log("error", { error: "No data found in the given date and time" });
        res.status(500).json(response("Slot not found"));
    }
}

const bookSlot = async (req, res, next) => {
    // create appoinments in a seperate collection and add the id in the slot collection
    let name = req.body.name, email = req.body.email, phone = req.body.phone, message = req.body.message;
    let userDetails = phone ? { name: name, phone: phone, message: message } : { name: name, email: email, message: message };
    const appnmentID = uuidv4();
    let doc_id = res.locals.appnmnt.mapValue.fields.id
    let booking = await db.write("appoinments", appnmentID, userDetails);
    logger.log("info", { booking: booking });
    // add appoinmentID to slot collection
    let updated = await db.addBooking(req.body.date, req.body.time, appnmentID, doc_id);
    if (updated.data && booking.data) {
        res.status(200).json(response("Appoinment Booked", 1, updated));
    }
    else {
        res.status(500).json(response("Appoinment Booking Failed"));
    }
}

router.post("/", checkRequest, checkSlotifAvailable, bookSlot);

module.exports = router;