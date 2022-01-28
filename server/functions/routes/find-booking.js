const router = require("express").Router();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const response = require("../services/responses").responseFactory;
const db = require("../services/db");
const checkRequest = (req, res, next) => {
    if (req.params.from && req.params.to) {
        next();
    } else {
        res.status(400).json(response("Invalid Request"));
    }
}

const findBooking = async (req, res, next) => {
    let from = req.params.from;
    from = admin.firestore.Timestamp.fromDate(new Date(from));
    let to = req.params.to;
    to = admin.firestore.Timestamp.fromDate(new Date(to));
    // Finding booking based on a condition
    const findBooking = await db.read("slots", null, from.valueOf <= doc.data().from.valueOf() && to.valueOf >= doc.data().to.valueOf());
}
// request will be in the form /?from="Date"&to="Date"
router.get("/", checkRequest)
module.exports = router;