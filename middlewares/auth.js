const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const token = req.headers["x-access-token"];
	if(!token){
		return res.status(403).send("An authentication token is required.");
	}
	try{
		const decode = jwt.verify(token, process.env.TOKEN_KEY);
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
}

module.exports = auth;