// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userName: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
	contributions: {
		type: [{
			board_id: {
				type: mongoose.Schema.ObjectId,
				ref: 'Pixel',
			},
			updated_at: {
				type: Date,
				default: Date.now,
			},
		}],
		default: [],
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
