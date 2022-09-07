const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

// Dotenv
dotenv.config();

// Listening Port
const PORT = process.env.PORT || 5000

// import routes
const routes = require('./routes/routes')

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
	console.log(req.headers);
	res.sendFile('index.html');
});

app.listen(PORT, () => {
	console.log(`Server Started On Port ${PORT}`);
})