// routes/bloodBankRoutes.js
const express = require("express");
const router = express.Router();
const bloodBankController = require("../controllers/bloodBankController");

router.get("/", bloodBankController.getAllEntries);
router.post("/", bloodBankController.createBloodBankEntry);
router.get("/:id", bloodBankController.getEntryById);
router.put("/:id", bloodBankController.updateEntry);
router.delete("/:id", bloodBankController.deleteEntry);

module.exports = router;
