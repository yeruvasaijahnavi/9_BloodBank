// index.js
const express = require("express");
const app = express();
const bloodBankRoutes = require("./routes/bloodBankRoutes");

app.use(express.json()); // Middleware to parse JSON
app.use("/api/bloodbank", bloodBankRoutes); // Use routes

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
