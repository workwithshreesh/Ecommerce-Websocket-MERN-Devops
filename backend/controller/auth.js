const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const handleSuccessRes = require('../utils/error-success-res/successRes');
const handleErrorRes = require('../utils/error-success-res/errorRes')
const { Users } = db;


exports.register = async (req, res) => {
  try {
    const { fname, lname, email, password, role } = req.body;

    if (!fname || !lname || !email || !password) {
      return handleErrorRes(res, 422, "All fields are required" );
    }

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return handleErrorRes(res, 409, "User already exists" );
    }

    const newUser = await Users.create({
      fname,
      lname,
      email,
      password,
      role: role || 'user',
    });

    return handleSuccessRes(res, 201, {
        id: newUser.id,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        role: newUser.role,
      });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleErrorRes(res, 422, 'Email and password are required');
    }

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return handleErrorRes(res, 404, "User not found" );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return handleErrorRes(res, 401, "Invalid credentials" );
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return handleSuccessRes(res, 200,  {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        token: token
      })

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
