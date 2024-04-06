/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

function connectToDb() {
	const mongoUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}?authSource=admin`;
	console.log('mongoUri', mongoUri);
	mongoose.connect(mongoUri)
		.then(() => {
			console.log('Connected to the database');
		},
		(err) => {
			console.log('Cannot connect to the database', err);
		});
}

module.exports = connectToDb;
