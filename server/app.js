const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./Routes/Product');
const userRoutes = require('./Routes/User');

dotenv.config();

const PORT = process.env.PORT || 6001
const Mongodb_Url = process.env.MONGO_URL

const app = express();
app.use(express.json());

app.use("/api/users/", userRoutes)
app.use("/api/products/", productRoutes)



//MongoDB setup
mongoose.connect(Mongodb_Url, {
	useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,

}).then(() => {
	app.listen(PORT, () => console.log(`Server PORT ${PORT}`))
}).catch((err) => {
	// console.log(`${err}: did not connect`)
})