const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: `Error creating user ${error.message}` });
  }
}


const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'no user with email' });
      }
      const comparePass = await bcrypt.compare(password, user.password);

      if(!comparePass){
        return res.status(401).json({message: `Incorrect credentials`})
      }
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      res.json({ 
        success: true,
        message: "Login successful!",
        token
       });
    } catch (error) {
      res.status(500).json({ error: `Error logging in ${error.message}`});
    }
  }

module.exports = { registerUser, loginUser }