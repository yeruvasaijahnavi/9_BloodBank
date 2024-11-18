const express = require("express");
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Placeholder for routes (we'll add this later)
app.use("/api/bloodbank", require("./routes/bloodBankRoutes"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
