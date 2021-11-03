const express = require('express');
const router = express.Router();
const url = require('url');


module.exports = (server) => {
    router.post('/auth/login', (req, res, next) => {
		let loginFailed = server.db.getState().loginFailed; 
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				return user.login.toUpperCase() === req.body.name.toUpperCase();
			});

		if(!matchedUser) {
			res.status(401).json(loginFailed);
		} else if(matchedUser.password === req.body.password) {
			res.json({ token: matchedUser.fakeToken});
		} else {
			res.status(401).json(loginFailed);
		}
	});

	return router
}