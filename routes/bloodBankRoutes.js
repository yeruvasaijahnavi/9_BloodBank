const express = require("express");
const router = express.Router();
const bloodBankController = require("../controllers/bloodBankController");

router.get("/search", bloodBankController.searchBloodBank); // more specific routes should come first

router.get("/", bloodBankController.getAllEntries);
router.post("/", bloodBankController.createBloodBankEntry);
router.get("/:id", bloodBankController.getEntryById);
router.put("/:id", bloodBankController.updateEntry);
router.delete("/:id", bloodBankController.deleteEntry);

module.exports = router;
