const express = require('express');
const { register, login, logout } = require("../controllers/user");
const { add } = require("../controllers/category");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/add', add);

module.exports = router;