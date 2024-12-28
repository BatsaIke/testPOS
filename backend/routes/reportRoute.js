const express = require("express");
const { getReports } = require("../controller/reportController");
const auth = require("../middleware/auth");
const router = express.Router();

// Add a route for fetching reports
router.get("/reports", auth, getReports);

module.exports = router;
