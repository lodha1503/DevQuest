const mongoose = require('mongoose');
const Product = require("./product");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
