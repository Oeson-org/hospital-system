const router = require("express").Router();
const response = require("../services/responses").responseFactory;
const db = require("../services/db");
const { v4: uuidv4 } = require("uuid");
const logger = require("../services/logger");
const checkRequest = (req, res, next) => {
    if (req.body.date && req.body.time && req.body.name && (req.body.email || req.body.phone) && req.body.message) {
        next();
    } else {
        res.status(400).json(response("Insufficient Data"));
    }
}
const checkSlotifAvailable = async (req, res, next) => {
    let { date, time } = req.body;
    //res.locals.userDetails = { name: name, email: email, phone: phone, message: message };
    logger.log("info", { date: date, time: time });

    let appoinment = await db.find("slots", date, time);
    if (appoinment.data) {
        logger.log("info", { appoinment: appoinment });
        res.locals.appnmnt = appoinment.data;
        logger.log("info", { ap: res.locals.appoinment });
        // next();
        res.status(200).json(response("Slot found for booking", 1, appoinment.data));
    }
    else {
        logger.log("error", { error: "No data found in the given date and time" });
        res.status(500).json(response("Slot not found"));
    }
}

const bookSlot = async (req, res, next) => {
    //create appoinments in a seperate collection and add the id in the slot collection
    const appnmentID = uuidv4();
    let booking = await db.write("appoinments", appnmentID, res.locals.userDetails);
    // add appoinmentID to slot collection
    let updated = await db.addBooking(req.body.date, req.body.time, appnmentID);
    if (updated.data) {
        res.status(200).json(response("Appoinment Booked", 1, updated));
    }
    else {
        res.status(500).json(response("Appoinment Booking Failed"));
    }
}

router.post("/", checkRequest, checkSlotifAvailable);

module.exports = router;