const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
});

userSchema.pre('remove', async function(next) {
  const userId = this._id;
  
  try {
    // Delete all notes associated with the user
    await mongoose.model('Note').deleteMany({ user: userId });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
