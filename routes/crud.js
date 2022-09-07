const router = require('express').Router();
const conn = require('../dbo/dbo');
const auth = require('../middlewares/auth');

router.get("/:table", auth, (req, res) => {
	// Get All Rows
	conn.query(
		`SELECT * FROM ${req.params.table}`,
	 	(err, results, fields) => {
	 		if(err) throw err;
	 		res.status(200).json(results);
	 	}
	);
});

router.post("/:table", auth, (req, res) => {
	// Add Row
	const data = req.body;
	const field = [];
	const value = [];
	for(const val in data){
		field.push(val);
		value.push(`'${data[val]}'`);
	}
	
	conn.query(
		`INSERT INTO ${req.params.table} (${field.toString()}) VALUES (${value.toString()})`,
		(err, results, fields) => {
			if(err) throw err;
			res.status(201).json(results);
		}
	);
});

router.get("/:table/:id", auth, (req, res) => {
	// Get Row by ID
	conn.query(
		`SELECT * FROM ${req.params.table} WHERE id=${req.params.id} LIMIT 1`,
		(err, results, fields) => {
			if(err) throw err;
			res.status(200).json(results[0]);
		}
	);
});

router.delete("/:table/:id", auth, (req, res) => {
	// Delete Row
	conn.query(
		`DELETE FROM ${req.params.table} WHERE id=${req.params.id}`,
		(err, results, fields) => {
			if(err) throw err;
			res.status(204).json(results);
		}
	);
});

router.put("/:table/:id", auth, (req, res) => {
	// Update Row
	const data = req.body;
	let query = [];
	for(const val in data){
		query.push(` ${val} = '${data[val]}'`);
	}
	conn.query(
		`UPDATE ${req.params.table} SET ${query.toString()} WHERE id=${req.params.id}`,
		(err, results, fields) => {
			if(err) throw err;
			res.status(200).json(results);
		}
	);
});

module.exports = router