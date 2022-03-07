const router = require("express").Router();
router.use("/create-slots", require("./admin-availability"));
router.use("/find-slots", require("./find-booking"));
router.use("/book-slot", require("./create-appoinment"));
module.exports = router;
