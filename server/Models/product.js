const mongoose = require('mongoose');
const User = require('../Models/user')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    site: {
        type: String,
        default: "General"
    },
    productId: {
        type: Number,
        unique: true,
        required: true,
    }
    

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;