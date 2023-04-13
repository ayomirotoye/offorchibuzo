/* eslint-disable no-undef */
require("dotenv").config();
const mongoose = require('mongoose');

function connect() {
	mongoose.connect(process.env.MONGODB)

	
	const  db = mongoose.connection;

	db.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
	});
	db.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});
}

module.exports = { connect }