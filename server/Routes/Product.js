const express = require('express');
const { searchProducts, displayProducts, suggestProducts } = require('../Services/Product');
const router = express.Router();


router.use("/title/:title", displayProducts);
router.use("/search/:title", searchProducts);
router.use("/suggestions/:title", suggestProducts);

module.exports = router;
