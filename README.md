# Quickify

Dynamic web app for seamless product search, price tracking, and notifications from various E-Commerce sites.

## Features

1. *Product Search:*
   - Intelligent search with debouncing for quick suggestions.
   - Adapts to user input, ensuring a seamless and user-friendly search.

2. *Pin Products:*
   - Empowers users to track price changes for pinned products.

3. *Notification System:*
   - Utilizes a specialized library for email notifications on price drops.
   - Configurable user-set thresholds for prompt email alerts.

4. *Login and Sign Up:*
   - Unique monkey animation during login for enhanced user engagement.

5. *Auto-Suggestions:*
   - Streamlines the search process with intelligent auto-suggestions.

6. *Multi-Source Product Information:*
   - Displays prices and features from various E-Commerce sites.

7. *Wishlist:*
   - Allows users to manage a personalized list of desired products.

## Technologies Used

### Frontend:
   - ReactJs
   - Material UI

### Backend:
   - Node Js
   - Express

### Database:
   - MongoDB with Mongoose

### Libraries and Tools:
   - Bcrypt
   - Fuse
   - Cors
   - Firebase
   - Nodemailer
   - JSON Web Token

## Installation

```bash
# Clone the Repository
git clone [repository_url]

# Install Dependencies for the Client
cd client
npm install

# Install Dependencies for the Server
cd ../server
npm install

# Run the Server
nodemon app.js

# Run the Client
cd ../client
npm start
