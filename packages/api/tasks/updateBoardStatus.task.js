/* eslint-disable import/no-extraneous-dependencies */
const cron = require('node-cron');
const mongoose = require('mongoose');
const Board = require('../models/board.model');

const updateBoardStatus = async () => {
	try {
		const mongoUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}?authSource=admin`;
		await mongoose.connect(mongoUri);
		const boards = await Board.find({ status: 'ongoing' });
		const now = new Date();
		boards.forEach(async (board) => {
			if (now > board.end_date) {
				board.status = 'finished';
				await board.save();
			}
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`There was a problem updating the board status: ${error}`);
	}
};

cron.schedule('0 * * * *', updateBoardStatus);
