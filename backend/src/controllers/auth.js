import User from "../models/User.js";
import jwt from "jsonwebtoken";

// JWT token generator
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

// Register controller
export const registerAuth = async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (fullName.length < 3)
      return res
        .status(400)
        .json({ message: "Full name should be at least 3 characters long" });

    if (username.length < 3)
      return res
        .status(400)
        .json({ message: "Username should be at least 3 characters long" });

    const usernamePattern = /^[a-zA-Z0-9._]{3,30}$/;
    if (!usernamePattern.test(username)) {
      return res.status(400).json({
        message:
          "Username is invalid. Only letters, numbers, dots, underscores allowed, 3-30 characters.",
      });
    }

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exists" });

    // Generate avatar
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const user = new User({
      fullName,
      email,
      username,
      password,
      avatar,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login controller
export const loginAuth = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
