const express = require('express');
const { searchProducts, displayProducts, filterBySite, suggestions } = require('../Services/Product');
const router = express.Router();


router.use("/title/:title", displayProducts);
router.use("/search/:title", searchProducts);
router.use("/suggestions/:title", suggestions)
// router.use("/title/:title/:site", filterBySite);

module.exports = router;
