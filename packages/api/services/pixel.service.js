const Pixel = require('../models/pixel.model');

const deletePixelByBoardId = async (boardId) => {
	try {
		await Pixel.deleteMany({ board_id: boardId });
	} catch (error) {
		throw new Error(`There was a problem deleting the pixels: ${error}`);
	}
};

module.exports = deletePixelByBoardId;
