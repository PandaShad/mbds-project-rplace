// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const pixelSchema = new mongoose.Schema({
	board: { type: mongoose.Schema.ObjectId, ref: 'Board', required: true },
	position: {
		type: {
			x: { type: Number, required: true },
			y: { type: Number, required: true },
		},
		required: true,
	},
	color: { type: String, required: true },
	created_by: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
	created_date: { type: Date, required: true },
});

pixelSchema.index({ board: 1, position: 1 }, { unique: true });

const Pixel = mongoose.model('Pixel', pixelSchema);

module.exports = Pixel;
