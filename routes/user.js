const express = require('express');
const { register, login, logout } = require("../controllers/user");
const { addCategory } = require("../controllers/category");
const {addProduct} = require("../controllers/product");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/addCategory', addCategory);
router.post('/addProduct', addProduct);

module.exports = router;