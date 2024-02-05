const express = require('express');

const articleService = require('../services/article');

const router = express.Router();

router.get('/', (req, res) => { // GET SUR localhost:8000/articles
	res.json(articleService.articles);
});

router.post('/', (req, res) => { // POST SUR localhost:8000/articles
	const { body } = req; // récupère le body de la requête
	// eslint-disable-next-line no-console
	console.log(`body ==> ${body}`);
	const articles = articleService.save(body); // ajoute un article
	res.json(articles); // renvoie le tableau mis à jour au format JSON
});

exports.articleAPI = router;
