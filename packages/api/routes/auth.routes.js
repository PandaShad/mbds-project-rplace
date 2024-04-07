/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const { Router, json, urlencoded } = require('express');
const { sign } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const User = require('../models/user.model.js');
const verifyToken = require('../middlewares/auth.middleware.js');

const authRouter = Router();
authRouter.use(json());
authRouter.use(urlencoded({ extended: true }));

authRouter.post('/register', async (req, res) => {
	try {
		const userExists = await User.findOne({
			$or: [
				{
					email: req.body.email,
				},
				{
					userName: req.body.userName,
				},
			],
		});
		if (userExists) {
			if (userExists.userName === req.body.userName) {
				return res.status(400).send(`A user with that username (${req.body.userName}) has already registered. Please use a different username.`);
			}
			return res.status(400).send(`A user with that email (${req.body.email}) has already registered. Please use a different email.`);
		}
		const hashedPassword = await hash(req.body.password, 10);
		const newUser = new User({
			userName: req.body.userName,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashedPassword,
			role: 'user',
		});
		await newUser.save();
		const token = sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
			expiresIn: 86400,
		});
		return res.status(201).send({ auth: true, token, message: 'User created' });
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
		const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
			expiresIn: 86400,
		});
		return res.status(200).send({ auth: true, token });
	} catch (error) {
		return res.status(500).send(`There was a problem on the server: ${error}`);
	}
});

authRouter.get('/me', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
			.select('-password')
			.populate({
				path: 'contributions.board_id',
				select: 'title description dimension status start_date end_date waiting_time',
			});
		if (!user) {
			return res.status(404).send('No user found');
		}
		return res.status(200).send(user);
	} catch (error) {
		return res.status(500).send(`There was a problem finding the user: ${error}`);
	}
});

authRouter.get('/logout', (_, res) => {
	res.status(200).send({ auth: false, token: null });
});

authRouter.get('/count', async (_, res) => {
	try {
		const count = await User.countDocuments();
		return res.status(200).send({ count });
	} catch (error) {
		return res.status(500).send(`There was a problem counting the users: ${error}`);
	}
});

module.exports = authRouter;
