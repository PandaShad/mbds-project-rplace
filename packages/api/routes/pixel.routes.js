const { Router, json, urlencoded } = require('express');
const Pixel = require('../models/pixel.model');
const { updateUserContributions } = require('../services/user.service');

const pixelRouter = Router();
pixelRouter.use(json());
pixelRouter.use(urlencoded({ extended: true }));

pixelRouter.post('/create', async (req, res) => {
	try {
		const existingPixel = await Pixel.findOne({
			board_id: req.body.board_id,
			position: req.body.position,
		});

		if (existingPixel) {
			return res.status(400).send('Pixel already exists');
		}

		const newPixel = new Pixel({
			board_id: req.body.board_id,
			position: req.body.position,
			color: req.body.color,
			created_by: req.body.created_by,
			created_date: Date.now(),
			last_update: Date.now(),
			update_number: 1,
		});
		await newPixel.save();
		await updateUserContributions(req.body.created_by, newPixel.board_id);
		return res.status(201).send('Pixel created');
	} catch (error) {
		return res.status(500).send(`There was a problem creating the pixel: ${error}`);
	}
});

pixelRouter.get('/getBoard/:board_id', async (req, res) => {
	try {
		const pixels = await Pixel.find({ board_id: req.params.board_id });
		return res.status(200).send(pixels);
	} catch (error) {
		return res.status(500).send(`There was a problem getting the pixels: ${error}`);
	}
});

pixelRouter.put('/:id/update', async (req, res) => {
	try {
		const pixel = await Pixel.findById(req.params.id);
		if (!pixel) {
			return res.status(404).send('Pixel not found');
		}
		pixel.color = req.body.color;
		pixel.created_by = req.body.created_by;
		pixel.last_update = Date.now();
		pixel.update_number += 1;
		await pixel.save();
		await updateUserContributions(req.body.created_by, pixel.board_id);
		return res.status(200).send('Pixel updated');
	} catch (error) {
		return res.status(500).send(`There was a problem updating the pixel: ${error}`);
	}
});

module.exports = pixelRouter;
