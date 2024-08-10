import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const createToken = async (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.json({
        success: false,
        message: 'User Already Exists',
        error: true,
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Please enter a valid email',
        error: true,
      });
    }
    let cart = {};
    for (let i = 0; i < 100; i++) {
      cart[i] = 0;
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'password must be at least 8 characters',
        error: true,
      });
    } else {
      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create User
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        cartData: cart,
      });

      // Save User in DB
      await newUser.save();
      const data = {
        user: {
          id: newUser._id,
        },
      };

      // Create Token
      const TOKEN = await createToken(data);
      res.status(201).json({
        success: true,
        message: 'User Registered Successfully',
        token: TOKEN,
        error: false,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, error: true });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: 'User Does Not Exist',
        error: true,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: 'Incorrect credentials',
        error: true,
      });
    }
    const data = {
      user: {
        id: user._id,
      },
    };
    const TOKEN = await createToken(data);
    res.status(200).json({
      success: true,
      message: 'User Logged In Successfully',
      token: TOKEN,
      error: false,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, error: true });
  }
};
