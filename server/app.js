const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./Routes/Product');
const userRoutes = require('./Routes/User');
const PORT = process.env.PORT || 5000
const nodemailer = require('nodemailer');
const products = require('./product.json');

const cors = require('cors')

const app = express();
const options = {
  origin: "http://localhost:3000"
}
app.use(cors(options))
dotenv.config();

dotenv.config();


const Mongodb_Url = process.env.MONGO_URL

app.use(express.json());

app.use("/api/users/", userRoutes)
app.use("/api/products/", productRoutes)
















// Set up your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arinsoni.iitb@gmail.com',
    pass: 'xtwjzmadwglurrjf',
  },
});

// Replace with your email address
const recipientEmail = 'arinsoni.iitb@gmail.com';

// Flag to track whether the email has been sent
let emailSent = false;

// Function to send email notification
const sendEmailNotification = (product) => {
  if (!emailSent) {
    const mailOptions = {
      from: 'lodhashreyansh0@gmail.com',
      to: recipientEmail,
      subject: 'Price Notification',
      text: `The price of ${product.title} on ${product.site} has gone beyond the minimum threshold. Current price: ₹${product.price}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
        emailSent = true; // Set the flag to true after sending the email
      }
    });
  }
};



// Create an API endpoint to trigger email notification
app.get('/trigger-email', (req, res) => {
  products.forEach(product => {
    if (product.price <= product.min_price_notification) {
      sendEmailNotification(product);
    }
  });
  res.json({ message: 'Email notification triggered successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

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
