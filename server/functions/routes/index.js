const router = require("express").Router();
router.use("/admin-availability", require("./admin-availability"));
module.exports = router;
