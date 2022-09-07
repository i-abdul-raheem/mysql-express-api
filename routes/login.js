const router = require('express').Router();
const jwt = require('jsonwebtoken');
const conn = require('../dbo/dbo');

router.post('/', (req, res) => {
	const data = req.body;
	let query = '';
	if(data["username"] && data["email"] && data["password"]){
		query = `SELECT * FROM users WHERE username='${data["username"]}' AND email='${data["email"]}' AND password='${data["password"]}' LIMIT 1`;
	} else if (data["email"] && data["password"]){
		query = `SELECT * FROM users WHERE email='${data["email"]}' AND password='${data["password"]}' LIMIT 1`;
	} else if (data["username"] && data["password"]){
		query = `SELECT * FROM users WHERE username='${data["username"]}' AND password='${data["password"]}' LIMIT 1`;
	} else {
		res.send("Username/Email and Password required");
		return;
	}
	conn.query(query, (err, results, fields) => {
		if(results.length !== 0){
			const token = jwt.sign(
				{
					user_id: results[0]
				},
		        process.env.TOKEN_KEY,
		        {
		        	expiresIn: "1h",
		        }
			)
			results[0].token = token;
			res.status(200).json(results[0]);
		} else {
			res.status(400).send("Invalid User");
		}
	});
});

module.exports = router;