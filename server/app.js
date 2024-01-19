const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./Routes/Product');
const userRoutes = require('./Routes/User');
const PORT = process.env.PORT || 6001

const app = express();

app.use("/api/users/", userRoutes)
app.use(express.json());
app.use("/api/products/", productRoutes)



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});