/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
const express = require('express');
const http = require('http');
const { json, urlencoded } = require('express');
const cors = require('cors');
const socketIO = require('./socket.js');

const authRouter = require('./routes/auth.routes.js');
const boardRouter = require('./routes/board.routes.js');
const pixelRouter = require('./routes/pixel.routes.js');

const connectToDb = require('./database/conn.js');

const app = express();
const port = 8000;
const server = http.createServer(app);

const io = socketIO.init(server);

require('dotenv').config();
require('./tasks/updateBoardStatus.task.js');

app.use(cors()); //autorise le CORS
app.use(json());
app.use(urlencoded({ extended: true }));

const prefix = '/api';

app.use(`${prefix}/auth`, authRouter);
app.use(`${prefix}/board`, boardRouter);
app.use(`${prefix}/pixel`, pixelRouter);

io.on('connection', (socket) => {
	// eslint-disable-next-line no-console
	console.log('a user connected');
	socket.on('disconnect', () => {
		// eslint-disable-next-line no-console
		console.log('user disconnected');
	});
});

connectToDb();

server.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on ${port}`);
});

exports.io = io;
