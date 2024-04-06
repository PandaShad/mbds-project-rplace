function isAdmin(req, res, next) {
	if (req.user.role !== 'admin') {
		return res.status(403).send('You do not have the necessary permissions');
	}
	return next();
}

module.exports = isAdmin;
