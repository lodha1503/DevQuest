const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

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

// Simulated value of x
let x = 20;
let emailSent = false; // Flag to track whether the email has been sent

// Function to send email notification
const sendEmailNotification = (value) => {
  if (!emailSent) {
    const mailOptions = {
      from: 'lodhashreyansh0@gmail.com',
      to: recipientEmail,
      subject: 'X Value Notification',
      text: `The current value of x is ${value}. It has fallen below 10.`,
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

// Monitor the value of x
setInterval(() => {
  // Simulate changing the value of x (replace with your actual logic)
  x = 5; // Generates a random number between 0 and 20

  // Check if the value of x is less than 10
  if (x < 10) {
    sendEmailNotification(x);
  } else {
    emailSent = false; // Reset the flag if the value is no longer below 10
  }
}, 5000); // Check every 5 seconds (adjust as needed)

// Create an API endpoint to trigger email notification
app.post('/trigger-email', (req, res) => {
  sendEmailNotification(x);
  res.json({ message: 'Email notification triggered successfully.' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
