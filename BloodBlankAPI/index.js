const express = require("express");
const app = express();
const bloodBankRoutes = require("./routes/bloodBankRoutes");

app.use(express.json());
app.use("/api/bloodbank", bloodBankRoutes);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
