const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Complete user profile after phone verification
router.post('/complete-profile', async (req, res) => {
  try {
    const { phone, firstName, lastName, email, password } = req.body;

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

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'رمز عبور الزامی است',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists with this phone
    let user = await User.findOne({ where: { phone } });

    if (user) {
      // Update existing user
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = hashedPassword;
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
        password: hashedPassword,
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
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
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
      error: error.message
    });
  }
});

// Get user by phone - for checking if user exists
router.get('/user/:phone', async (req, res) => {
  try {
    const { phone } = req.params;

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

    res.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
        isProfileComplete: user.isProfileComplete,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت اطلاعات کاربر',
    });
  }
});

// Login endpoint - authenticate with phone + password
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'شماره تلفن و رمز عبور الزامی است',
      });
    }

    // Find user by phone
    const user = await User.findOne({ where: { phone } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'کاربری با این شماره تلفن یا رمز یافت نشد',
      });
    }

    // Check if user has a password set
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'لطفاً ابتدا رمز عبور خود را تنظیم کنید',
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'شماره تلفن یا رمز عبور اشتباه است',
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
    console.error('Login error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: 'خطا در ورود',
    });
  }
});

// Forgot password - send SMS code
router.post('/forgot-password', async (req, res) => {
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
        message: 'کاربری با این شماره تلفن یافت نشد',
      });
    }

    // Here you would integrate with SMS service to send verification code
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'کد بازیابی رمز عبور ارسال شد',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    console.error('Forgot password error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال کد بازیابی',
    });
  }
});

// Reset password - set new password without SMS verification
router.post('/reset-password', async (req, res) => {
  try {
    const { phone, newPassword } = req.body;

    if (!phone || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'شماره تلفن و رمز عبور جدید الزامی است',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
      });
    }

    // Find user by phone
    const user = await User.findOne({ where: { phone } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربری با این شماره تلفن یافت نشد',
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.json({
      success: true,
      message: 'رمز عبور با موفقیت تغییر کرد',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    console.error('Reset password error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: 'خطا در تغییر رمز عبور',
    });
  }
});

module.exports = router;

