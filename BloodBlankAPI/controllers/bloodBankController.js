// controllers/bloodBankController.js
let nextId = 1; // Start with ID 1
const bloodBankEntries = []; // Define an in-memory array for blood bank entries

// Function to create a new entry
const createBloodBankEntry = (req, res) => {
	const newEntry = {
		id: nextId++, // Increment the ID
		donorName: req.body.donorName,
		age: req.body.age,
		bloodType: req.body.bloodType,
		contactInfo: req.body.contactInfo,
		quantity: req.body.quantity,
		collectionDate: req.body.collectionDate,
		expirationDate: req.body.expirationDate,
		status: req.body.status,
	};

	// Log the new entry to check its contents
	// console.log("New entry being added:", newEntry);

	// Push the new entry into the array
	bloodBankEntries.push(newEntry);

	// Log the entire bloodBankEntries array after addition
	// console.log("Updated bloodBankEntries array:", bloodBankEntries);

	// Return the newly created entry
	// console.log("New entry created");
	res.status(201).json(newEntry);
};

// Function to get all entries with pagination
const getAllEntries = (req, res) => {
	const { page = 1, size = 10 } = req.query; // Get page and size from query parameters (with defaults)

	const pageNumber = parseInt(page, 10); // Convert page to integer
	const pageSize = parseInt(size, 10); // Convert size to integer

	if (pageNumber <= 0 || pageSize <= 0) {
		return res
			.status(400)
			.json({ message: "Page and size must be greater than 0." });
	}

	// Calculate the starting and ending index
	const startIndex = (pageNumber - 1) * pageSize;
	const endIndex = pageNumber * pageSize;

	// Slice the bloodBankEntries array to get the paginated data
	const paginatedEntries = bloodBankEntries.slice(startIndex, endIndex);

	// Create response metadata
	const totalEntries = bloodBankEntries.length;
	const totalPages = Math.ceil(totalEntries / pageSize);

	// Return the paginated result
	res.status(200).json({
		totalEntries,
		totalPages,
		currentPage: pageNumber,
		pageSize: pageSize,
		entries: paginatedEntries,
	});
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
const searchBloodBank = (req, res) => {
	const { bloodType, status, donorName } = req.query;

	if (!bloodType && !status && !donorName) {
		return res.status(400).json({
			message:
				"At least one search parameter ('bloodType' or 'status') is required.",
		});
	}

	if (bloodBankEntries.length === 0) {
		return res.status(404).json({ message: "Blood bank has no entries" });
	}

	let results = bloodBankEntries;

	// Filter by blood type if provided
	if (bloodType) {
		const decodedBloodType = bloodType
			.replace("_pos", "+")
			.replace("_neg", "-");

		results = results.filter(
			(entry) =>
				entry.bloodType.toLowerCase() === decodedBloodType.toLowerCase()
		);
	}

	// Filter by status if provided
	if (status) {
		results = results.filter(
			(entry) => entry.status.toLowerCase() === status.toLowerCase()
		);
	}

	if (donorName) {
		results = results.filter((entry) =>
			entry.donorName.toLowerCase().includes(donorName.toLowerCase())
		);
	}

	// Check if there are no results after filtering
	if (results.length === 0) {
		return res.status(404).json({
			message: "No entries found for the specified criteria.",
		});
	}

	return res.status(200).json(results);
};

// Export the functions for use in routes
module.exports = {
	createBloodBankEntry,
	getAllEntries,
	getEntryById,
	updateEntry,
	deleteEntry,
	searchBloodBank,
};
