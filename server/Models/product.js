const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true, 
        },
        site:{
            type: String,
            default: "General"
        },
        rating:{
          type: Integer
        },
    }
);

const Notes = mongoose.model("Notes", productSchema);
module.exports = Notes;