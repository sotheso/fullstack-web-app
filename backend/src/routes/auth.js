const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Complete user profile after phone verification
router.post('/complete-profile', async (req, res) => {
  try {
    const { phone, firstName, lastName, email } = req.body;

    // Validate inputs
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'شماره تلفن الزامی است',
      });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'نام و نام خانوادگی الزامی است',
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'ایمیل الزامی است',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'لطفاً یک ایمیل معتبر وارد کنید',
      });
    }

    // Check if user already exists with this phone
    let user = await User.findOne({ where: { phone } });

    if (user) {
      // Update existing user
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.isVerified = true;
      user.isProfileComplete = true;
      user.lastLogin = new Date();
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        phone,
        firstName,
        lastName,
        email,
        isVerified: true,
        isProfileComplete: true,
        lastLogin: new Date(),
      });
    }

    // Return success with user data (excluding sensitive info)
    res.json({
      success: true,
      message: 'ثبت نام با موفقیت انجام شد',
      user: {
        id: user.id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Complete profile error:', error);
    
    // Check for unique constraint violation (duplicate email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'این ایمیل قبلاً ثبت شده است',
      });
    }

    res.status(500).json({
      success: false,
      message: 'خطا در ثبت اطلاعات',
    });
  }
});

// Login endpoint - check if user exists and return user data
router.post('/login', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'شماره تلفن الزامی است',
      });
    }

    // Find user by phone
    const user = await User.findOne({ where: { phone } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر یافت نشد',
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'ورود موفقیت‌آمیز',
      user: {
        id: user.id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ورود',
    });
  }
});

module.exports = router;

