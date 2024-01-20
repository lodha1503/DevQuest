const express = require('express');
const { searchProducts, displayProducts, toggleFavorite } = require('../Services/Product');
const router = express.Router();


router.use("/title/:title", displayProducts);
router.use("/:user_id/search/:title", searchProducts);
router.use("/:user_id/favorites/:product_id", toggleFavorite);

module.exports = router;
