// MySQL
const mysql = require("mysql");
const conn = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
});
conn.connect((err) => {
	if(err){
		throw err;
	}
});

module.exports = conn;