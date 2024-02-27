const express = require('express');

const api = express.Router();

const { articleAPI } = require('./routes/article');

api.get('/', (req, res) => { // GET SUR localhost:8000/
	res.json({ response: 'Hello World!' });
});

api.use('/articles', articleAPI);

module.exports = api;
