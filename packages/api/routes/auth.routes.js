/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const { Router, json, urlencoded } = require('express');
const { sign } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const User = require('../models/user.model.js');

const authRouter = Router();
authRouter.use(json());
authRouter.use(urlencoded({ extended: true }));

authRouter.post('/register', async (req, res) => {
	try {
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			return res.status(400).send(`A user with that email (${req.body.email}) has already registered. Please use a different email.`);
		}
		const hashedPassword = await hash(req.body.password, 10);
		const newUser = new User({
			userName: req.body.userName,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashedPassword,
		});
		await newUser.save();
		return res.status(201).send('User created');
	} catch (error) {
		return res.status(500).send(`There was a problem registering the user: ${error}`);
	}
});

authRouter.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(404).send('The email or password is incorrect');
		}
		const passwordIsValid = await compare(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send('The email or password is incorrect');
		}
		// eslint-disable-next-line no-underscore-dangle
		const token = sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: 86400,
		});
		return res.status(200).send({ auth: true, token });
	} catch (error) {
		return res.status(500).send(`There was a problem on the server: ${error}`);
	}
});

authRouter.get('/logout', (_, res) => {
	res.status(200).send({ auth: false, token: null });
});

module.exports = authRouter;
