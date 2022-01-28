const router = require("express").Router();
router.use("/create-slots", require("./admin-availability"));
router.use("/find-slots", require("./find-booking"));
module.exports = router;
