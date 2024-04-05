const { json, urlencoded, Router } = require('express');
const Board = require('../models/board.model');
const isAdmin = require('../middlewares/admin.middleware');
const verifyToken = require('../middlewares/auth.middleware');
const deletePixelByBoardId = require('../services/pixel.service');

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
			start_date: Date.now(),
			end_date: req.body.end_date,
			status: 'ongoing',
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

boardRouter.get('/:id', async (req, res) => {
	try {
		const board = await Board.findById(req.params.id);
		return res.status(200).send(board);
	} catch (error) {
		return res.status(500).send(`There was a problem getting the board: ${error}`);
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

boardRouter.put('/:id/update', async (req, res) => {
	try {
		const board = await Board.findById(req.params.id);
		if (!board) {
			return res.status(404).send('Board not found');
		}
		if (board.status === 'finished') {
			return res.status(400).send('Board is already finished');
		}
		if (req.body.status === 'finished') {
			board.status = 'finished';
			board.end_date = Date.now();
		}
		board.title = req.body.title || board.title;
		board.override = req.body.override || board.override;
		board.description = req.body.description || board.description;
		board.dimension = {
			width: req.body.dimension.width || board.dimension.width,
			height: req.body.dimension.height || board.dimension.height,
		};
		board.waiting_time = req.body.waiting_time || board.waiting_time;
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
		// eslint-disable-next-line no-underscore-dangle
		await deletePixelByBoardId(board._id);
		await board.delete();
		return res.status(200).send('Board deleted');
	} catch (error) {
		return res.status(500).send(`There was a problem deleting the board: ${error}`);
	}
});

module.exports = boardRouter;
