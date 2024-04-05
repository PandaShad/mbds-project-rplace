// eslint-disable-next-line import/no-extraneous-dependencies
import { verify } from 'jsonwebtoken';

function verifyToken(req, res, next) {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(403).send({ auth: false, message: 'No token provided.' });
	}
	verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		}
		req.userId = decoded.id;
		return next();
	});
	return null;
}

export default verifyToken;
