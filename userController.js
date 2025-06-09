const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Report = require("../models/Report");

// Signup Controller
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Dashboard Data
exports.getDashboard = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id });
    res.status(200).json({ reports });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
