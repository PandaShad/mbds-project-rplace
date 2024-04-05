/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
const express = require('express');
const { json, urlencoded } = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth.routes.js');
const connectToDb = require('./database/conn.js');

const app = express();
const port = 8000;
require('dotenv').config();

app.use(cors()); //autorise le CORS
app.use(json());
app.use(urlencoded({ extended: true }));

const prefix = '/api';

app.use(`${prefix}/auth`, authRouter);

connectToDb();

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on ${port}`);
});
