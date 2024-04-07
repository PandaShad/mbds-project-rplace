/* eslint-disable no-underscore-dangle */
const { json, urlencoded, Router } = require('express');
const Board = require('../models/board.model');
const isAdmin = require('../middlewares/admin.middleware');
const verifyToken = require('../middlewares/auth.middleware');
const deletePixelByBoardId = require('../services/pixel.service');
const { deleteUserContributions } = require('../services/user.service');

const boardRouter = Router();
boardRouter.use(json());
boardRouter.use(urlencoded({ extended: true }));

boardRouter.post('/create', [verifyToken, isAdmin], async (req, res) => {
	try {
		const newBoard = new Board({
			title: req.body.title,
			override: req.body.override,
			description: req.body.description || '',
			dimension: {
				width: req.body.dimension.width,
				height: req.body.dimension.height,
			},
			waiting_time: req.body.waiting_time,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			status: req.body.status,
			created_by: req.body.created_by,
		});
		await newBoard.save();
		return res.status(201).send('Board created');
	} catch (error) {
		return res.status(500).send(`There was a problem creating the board: ${error}`);
	}
});

boardRouter.get('/list-ongoing', async (_, res) => {
	try {
		const boards = await Board.find({ status: 'ongoing' });
		return res.status(200).send(boards);
	} catch (error) {
		return res.status(500).send(`There was a problem listing the ongoing boards: ${error}`);
	}
});

boardRouter.get('/list-finished', async (_, res) => {
	try {
		const boards = await Board.find({ status: 'finished' });
		return res.status(200).send(boards);
	} catch (error) {
		return res.status(500).send(`There was a problem listing the finished boards: ${error}`);
	}
});

boardRouter.get('/list-upcoming', async (_, res) => {
	try {
		const boards = await Board.find({ status: 'upcoming' });
		return res.status(200).send(boards);
	} catch (error) {
		return res.status(500).send(`There was a problem listing the upcoming boards: ${error}`);
	}
});

boardRouter.get('/count', async (_, res) => {
	try {
		const count = await Board.countDocuments();
		return res.status(200).send({ count });
	} catch (error) {
		return res.status(500).send(`There was a problem counting the boards: ${error}`);
	}
});

boardRouter.get('/:id', async (req, res) => {
	try {
		const board = await Board.findById(req.params.id);
		return res.status(200).send(board);
	} catch (error) {
		return res.status(500).send(`There was a problem getting the board: ${error}`);
	}
});

boardRouter.put('/:id/update', async (req, res) => {
	try {
		const board = await Board.findById(req.params.id);
		if (!board) {
			return res.status(404).send('Board not found');
		}
		if (board.status === 'finished') {
			return res.status(400).send('Board is already finished');
		}
		if (req.body.status && req.body.status === 'finished') {
			board.status = 'finished';
			board.end_date = Date.now();
		}
		if (req.body.end_date && Date.parse(req.body.end_date) < Date.now()) {
			return res.status(400).send('End date must be greater than current date');
		}
		board.title = req.body.title || board.title;
		board.override = req.body.override || board.override;
		board.description = req.body.description || board.description;
		board.waiting_time = req.body.waiting_time || board.waiting_time;
		board.end_date = req.body.end_date || board.end_date;
		await board.save();
		return res.status(200).send('Board updated');
	} catch (error) {
		return res.status(500).send(`There was a problem updating the board: ${error}`);
	}
});

boardRouter.delete('/:id/delete', async (req, res) => {
	try {
		const board = await Board.findById(req.params.id);
		if (!board) {
			return res.status(404).send('Board not found');
		}
		await deletePixelByBoardId(board._id);
		await deleteUserContributions(board._id);
		await Board.deleteOne({ _id: board._id });
		return res.status(200).send('Board deleted');
	} catch (error) {
		return res.status(500).send(`There was a problem deleting the board: ${error}`);
	}
});

module.exports = boardRouter;
