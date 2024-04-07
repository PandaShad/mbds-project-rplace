// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const pixelSchema = new mongoose.Schema({
	board_id: { type: mongoose.Schema.ObjectId, ref: 'Board', required: true },
	position: {
		type: {
			x: { type: Number, required: true },
			y: { type: Number, required: true },
		},
		required: true,
		_id: false,
	},
	color: { type: String, required: true },
	created_by: { type: mongoose.Schema.ObjectId, ref: 'User' },
	created_date: { type: Date, required: true },
	last_update: { type: Date, required: true },
	update_number: { type: Number, required: true },
});

pixelSchema.index({ board_id: 1, position: 1 }, { unique: true });

const Pixel = mongoose.model('Pixel', pixelSchema);

module.exports = Pixel;
