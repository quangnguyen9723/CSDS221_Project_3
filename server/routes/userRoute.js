const express = require("express");
const {getUsers, createUser} = require("../controllers/userController");

const router = express.Router();

router.get('/api/users', getUsers);
router.post('/api/users', createUser);

module.exports = router;
