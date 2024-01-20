const User = require("../Models/user");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");



//Reg
const registration = async (req, res) => {
  let success = false;
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success,
        message: "Sorry! A user with same email address already exist",
      });
    }

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    await newUser.save();
    success = true;
    res.status(200).json({ success, savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//LOGIN
const login = async (req, res) => {
  let success = false;
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res
        .status(400)
        .json({ message: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };


    success = true;
    res.status(200).json({ success, token, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  login,
  registration
};
