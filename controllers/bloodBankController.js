const bloodBankEntries = [];

const createBloodBankEntry = (req, res) => {
	const newEntry = {
		id: bloodBankEntries.length + 1,
		donorName: req.body.donorName,
		age: req.body.age,
		bloodType: req.body.bloodType,
		contactInfo: req.body.contactInfo,
		quantity: req.body.quantity,
		collectionDate: req.body.collectionDate,
		expirationDate: req.body.expirationDate,
		status: req.body.status,
	};

	bloodBankEntries.push(newEntry);

	console.log("New entry created");
	res.status(201).json(newEntry);
};

const getAllEntries = (req, res) => {
	const { page = 1, size = 10 } = req.query;

	const pageNumber = parseInt(page, 10);
	const pageSize = parseInt(size, 10);

	if (pageNumber <= 0 || pageSize <= 0) {
		return res
			.status(400)
			.json({ message: "Page and size must be greater than 0." });
	}

	const startIndex = (pageNumber - 1) * pageSize;
	const endIndex = pageNumber * pageSize;

	const paginatedEntries = bloodBankEntries.slice(startIndex, endIndex);

	const totalEntries = bloodBankEntries.length;
	const totalPages = Math.ceil(totalEntries / pageSize);

	res.status(200).json({
		totalEntries,
		totalPages,
		currentPage: pageNumber,
		pageSize: pageSize,
		entries: paginatedEntries,
	});
};

const getEntryById = (req, res) => {
	const entry = bloodBankEntries.find(
		(e) => e.id === parseInt(req.params.id)
	);
	if (!entry) {
		return res.status(404).json({ message: "Entry not found" });
	}
	res.status(200).json(entry);
};

const updateEntry = (req, res) => {
	const entry = bloodBankEntries.find(
		(e) => e.id === parseInt(req.params.id)
	);
	if (!entry) {
		return res.status(404).json({ message: "Entry not found" });
	}

	Object.assign(entry, req.body);
	res.status(200).json(entry);
};

const deleteEntry = (req, res) => {
	const index = bloodBankEntries.findIndex(
		(e) => e.id === parseInt(req.params.id)
	);
	if (index === -1) {
		return res.status(404).json({ message: "Entry not found" });
	}

	bloodBankEntries.splice(index, 1);
	res.status(204).send();
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

	if (bloodType) {
		const decodedBloodType = bloodType
			.replace("_pos", "+")
			.replace("_neg", "-");

		results = results.filter(
			(entry) =>
				entry.bloodType.toLowerCase() === decodedBloodType.toLowerCase()
		);
	}

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

	if (results.length === 0) {
		return res.status(404).json({
			message: "No entries found for the specified criteria.",
		});
	}

	return res.status(200).json(results);
};

module.exports = {
	createBloodBankEntry,
	getAllEntries,
	getEntryById,
	updateEntry,
	deleteEntry,
	searchBloodBank,
};
