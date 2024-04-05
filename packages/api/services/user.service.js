const User = require('../models/user.model');

const upadteUserContributions = async (userId, boardId) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}
	const contribution = user.contributions.find((c) => c.board_id.equals(boardId));
	if (!contribution) {
		user.contributions.push({
			board_id: boardId,
		});
	} else {
		contribution.update_number += 1;
	}
	await user.save();
};

const deleteUserContributions = async (boardId) => {
	const users = await User.find({ 'contributions.board_id': boardId });
	users.forEach(async (user) => {
		const contribution = user.contributions.find((c) => c.board_id.equals(boardId));
		user.contributions.pull(contribution);
		await user.save();
	});
};

module.exports = {
	upadteUserContributions,
	deleteUserContributions,
};
