const express = require("express");
const router = express.Router();

// Placeholder route
router.get("/", (req, res) => {
	res.send("Blood Bank API is working!");
});

module.exports = router;
