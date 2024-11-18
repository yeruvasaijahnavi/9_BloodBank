const bloodBankEntries = [];

// Function to get all entries
const getAllEntries = (req, res) => {
	res.status(200).json(bloodBankEntries); // Return all blood bank entries
};

// Function to create a new entry
const createEntry = (req, res) => {
	const newEntry = {
		id: bloodBankEntries.length++, // Increment the ID
		donorName: req.body.donorName,
		age: req.body.age,
		bloodType: req.body.bloodType,
		contactInfo: req.body.contactInfo,
		quantity: req.body.quantity,
		collectionDate: req.body.collectionDate,
		expirationDate: req.body.expirationDate,
		status: req.body.status,
	};
	bloodBankEntries.push(newEntry); // Add the new entry to the array
	res.status(201).json(newEntry); // Return the newly created entry
};

// Function to get a specific entry by its ID
const getEntryById = (req, res) => {
	const entry = bloodBankEntries.find(
		(e) => e.id === parseInt(req.params.id)
	); // Ensure ID is an integer
	if (!entry) {
		return res.status(404).json({ message: "Entry not found" });
	}
	res.status(200).json(entry);
};

// Function to update an existing entry
const updateEntry = (req, res) => {
	const entry = bloodBankEntries.find(
		(e) => e.id === parseInt(req.params.id)
	); // Ensure ID is an integer
	if (!entry) {
		return res.status(404).json({ message: "Entry not found" });
	}

	Object.assign(entry, req.body); // Merge updates into existing entry
	res.status(200).json(entry); // Return the updated entry
};

// Function to delete an entry by ID
const deleteEntry = (req, res) => {
	const index = bloodBankEntries.findIndex(
		(e) => e.id === parseInt(req.params.id)
	); // Ensure ID is an integer
	if (index === -1) {
		return res.status(404).json({ message: "Entry not found" });
	}

	bloodBankEntries.splice(index, 1); // Remove entry from array
	res.status(204).send(); // No content response
};

// Export the functions for use in routes
module.exports = {
	createEntry,
	getAllEntries,
	getEntryById,
	updateEntry,
	deleteEntry,
};
