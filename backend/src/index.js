const express = require('express');
const app = express();
const cors = require('cors');

const {counterparty_data_mock} = require("../mock-data/counterparty");

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/api/counterparty", (req, res, next) => {
	try {
		let filteredData = [...counterparty_data_mock];

		// Filter by name (case-insensitive partial match)
		if (req.query.name) {
			const nameQuery = req.query.name.toLowerCase();
			filteredData = filteredData.filter(item =>
				item.name.toLowerCase().includes(nameQuery)
			);
		}

		// Filter by email (case-insensitive partial match)
		if (req.query.email) {
			const emailQuery = req.query.email.toLowerCase();
			filteredData = filteredData.filter(item =>
				item.email.toLowerCase().includes(emailQuery)
			);
		}

		// Filter by phone (partial match)
		if (req.query.phone) {
			filteredData = filteredData.filter(item =>
				item.phone.includes(req.query.phone)
			);
		}

		// Filter by address (case-insensitive partial match)
		if (req.query.address) {
			const addressQuery = req.query.address.toLowerCase();
			filteredData = filteredData.filter(item =>
				item.address.toLowerCase().includes(addressQuery)
			);
		}

		// Filter by status (exact match, case-insensitive)
		if (req.query.status) {
			const statusQuery = req.query.status.toLowerCase();
			filteredData = filteredData.filter(item =>
				item.status.toLowerCase() === statusQuery
			);
		}

		// Filter by department (supports multiple departments, comma-separated)
		if (req.query.department) {
			const departments = req.query.department.split(',').map(d => d.trim().toLowerCase());
			filteredData = filteredData.filter(item =>
				item.department.some(dept =>
					departments.some(queryDept => dept.toLowerCase().includes(queryDept))
				)
			);
		}

		// Filter by company (case-insensitive partial match)
		if (req.query.company) {
			const companyQuery = req.query.company.toLowerCase();
			filteredData = filteredData.filter(item =>
				item.company.toLowerCase().includes(companyQuery)
			);
		}

		// Sorting
		if (req.query.sortBy) {
			const sortField = req.query.sortBy;
			const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

			filteredData.sort((a, b) => {
				let aVal = a[sortField];
				let bVal = b[sortField];

				if (typeof aVal === 'string') {
					aVal = aVal.toLowerCase();
					bVal = bVal.toLowerCase();
				}

				if (aVal < bVal) return -1 * sortOrder;
				if (aVal > bVal) return 1 * sortOrder;
				return 0;
			});
		}

		// Get total count before pagination
		const totalCount = filteredData.length;

		// Pagination
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 30;
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;

		const paginatedData = filteredData.slice(startIndex, endIndex);

		// Response with metadata
		return res.status(200).json({
			success: true,
			data: paginatedData,
			pagination: {
				total: totalCount,
				page: page,
				limit: limit,
				totalPages: Math.ceil(totalCount / limit),
				hasNextPage: endIndex < totalCount,
				hasPrevPage: page > 1
			},
			filters: req.query
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Error filtering counterparty data',
			error: error.message
		});
	}
});


module.exports = app;
