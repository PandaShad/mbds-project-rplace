const User = require('../models/user.model');

const upadteUserContributions = async (userId, boardId) => {
	const user = User.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}
	const contribution = user.contributions.find((c) => c.board_id === boardId);
	if (!contribution) {
		user.contributions.push({
			board_id: boardId,
			pixels: 1,
		});
	} else {
		contribution.pixels += 1;
	}
	await user.save();
};

module.exports = upadteUserContributions;
