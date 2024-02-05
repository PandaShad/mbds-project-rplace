const express = require('express');
const cors = require('cors');

const api = require('./api');

const app = express();
const port = 8000;

app.use(express.json());

app.use(cors()); //autorise le CORS

app.get('/', (req, res) => { // GET SUR localhost:8000/
	res.send('Hello World!');
});

app.use('/api', api);

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on ${port}`);
});
