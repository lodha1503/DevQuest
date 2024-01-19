const express = require('express');
var cors = require('cors');
const router = require('./Routes/Product');
const port = 5000; // You can choose any available port

const app = express();


const options = {
  origin:'http://localhost:3000'
}
app.use(cors(options));
app.use("/api/products/", router)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});