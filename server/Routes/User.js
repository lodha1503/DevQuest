const express = require('express');
const { registration, login } = require('../Services/User');

const router = express.Router();

router.use("/registration", registration);
router.use("/login", login);


module.exports = router;
