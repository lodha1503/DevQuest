const express = require('express');


const router = require('./Routes/Product');
const port = 3001; // You can choose any available port

const app = express();
app.use("/api/products/", router)



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});