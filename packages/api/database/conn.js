/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const { hash } = require('bcryptjs');
const User = require('../models/user.model');

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

	// create an admin user if not exists
	User.findOne({ userName: 'admin' })
		.then(async (user) => {
			if (!user) {
				const hashedPassword = await hash('admin', 10);
				const adminUser = new User({
					userName: 'admin',
					firstName: 'Admin',
					lastName: 'User',
					email: 'admin@admin.com',
					password: hashedPassword,
					role: 'admin',
				});
				adminUser.save()
					.then(() => {
						console.log('Admin user created');
					})
					.catch((error) => {
						console.log('Error creating admin user', error);
					});
			}
		});
}

module.exports = connectToDb;
