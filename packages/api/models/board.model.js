/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
	title: { type: String, required: true },
	override: { type: Boolean, required: true },
	description: { type: String, default: '' },
	dimension: {
		type: {
			width: { type: Number, required: true },
			height: { type: Number, required: true },
		},
		required: true,
		_id: false,
	},
	waiting_time: { type: Number, required: true },
	start_date: { type: Date, required: true },
	end_date: { type: Date, required: true },
	status: { type: String, required: true },
	created_by: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
