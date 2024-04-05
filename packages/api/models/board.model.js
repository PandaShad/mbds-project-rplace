/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
	title: { type: String, required: true },
	override: { type: Boolean, required: true },
	description: { type: String, required: true },
	dimension: {
		type: {
			width: { type: Number, required: true },
			height: { type: Number, required: true },
		},
		required: true,
	},
	waiting_time: { type: Number, required: true },
	start_date: { type: Date, required: true },
	end_date: { type: Date, required: true },
	last_update: { type: Date, required: true },
	update_number: { type: Number, required: true },
	status: { type: String, required: true },
	created_by: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
