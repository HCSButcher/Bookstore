import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const Router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

Router.post("/register", async (req, res) => {
  try {
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "please fill all the above fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters " });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "username should be at least 3 characters" });
    }

    //check for existing user
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const user = new User({
      email,
      username,
      password,
      profileImage,
    });

    await User.Save();
    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in the register route ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please fill in all fields" });

    //check for user
    const user = User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    //check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    //generate token
    const token = generateToken(user_id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("error in login route");
    res.status(500).json({ message: "Internal server error" });
  }
});

export default Router;
