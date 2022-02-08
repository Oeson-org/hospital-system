const router = require("express").Router();
const response = require("../services/responses").responseFactory;
const db = require("../services/db");
const log = require("../services/logger").log;

const checkRequest = (req, res, next) => {
    if (req.body.date && req.body.time) {
        next();
    } else {
        res.status(400).json(response("Invalid Request"));
    }
}
const findBooking = async (req, res, next) => {
    let date = req.body.date;
    let time = req.body.time;
    log("info", { date: date, time: time });
    // Finding booking based on a condition
    let appoinment = await db.findSlots("slots", date, time);
    if (appoinment.data) {
        log("info", { appoinment: appoinment });
        res.status(200).json(response("Slots found", 1, appoinment.data._fieldsProto));
    }
    else {
        log("error", { error: err });
        res.status(500).json(response("Slots not found"));
    }
}

router.post("/", checkRequest, findBooking);

module.exports = router;