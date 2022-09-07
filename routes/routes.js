const router = require('express').Router();
const crud = require('./crud');
const login = require('./login');

router.use('/api', crud);
router.use('/login', login);

module.exports = router