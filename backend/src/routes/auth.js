const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const smsService = require('../services/smsService');

// Temporary storage for password reset codes (in production, use Redis or database)
const resetCodes = new Map(); // { phone: { code, timestamp } }

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
        registeredEvents: user.registeredEvents || [],
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
        registeredEvents: user.registeredEvents || [],
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
        registeredEvents: user.registeredEvents || [],
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

    // Send SMS verification code
    const smsResult = await smsService.sendVerificationCode(phone);
    
    if (!smsResult.success) {
      return res.status(500).json({
        success: false,
        message: 'خطا در ارسال کد تایید',
      });
    }

    // Store the code temporarily (expires in 5 minutes)
    resetCodes.set(phone, {
      code: smsResult.code,
      timestamp: Date.now(),
    });

    // Clean up old codes (older than 5 minutes)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    for (const [key, value] of resetCodes.entries()) {
      if (value.timestamp < fiveMinutesAgo) {
        resetCodes.delete(key);
      }
    }

    console.log('📱 کد تایید برای بازیابی رمز عبور ارسال شد:', phone);
    if (smsResult.demo) {
      console.log('🔧 Demo mode - کد:', smsResult.code);
    }

    res.json({
      success: true,
      message: 'کد تایید برای بازیابی رمز عبور ارسال شد',
      ...(smsResult.demo && { demoCode: smsResult.code }), // برای تست
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

// Verify reset code - check if entered code is correct
router.post('/verify-reset-code', async (req, res) => {
  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({
        success: false,
        message: 'شماره تلفن و کد تایید الزامی است',
      });
    }

    // Get stored code
    const storedData = resetCodes.get(phone);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: 'کد تایید منقضی شده یا یافت نشد. لطفاً دوباره درخواست دهید',
      });
    }

    // Check if code is expired (5 minutes)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    if (storedData.timestamp < fiveMinutesAgo) {
      resetCodes.delete(phone);
      return res.status(400).json({
        success: false,
        message: 'کد تایید منقضی شده است. لطفاً دوباره درخواست دهید',
      });
    }

    // Verify code
    if (storedData.code !== code) {
      return res.status(400).json({
        success: false,
        message: 'کد تایید اشتباه است',
      });
    }

    console.log('✅ کد تایید بازیابی رمز عبور تایید شد:', phone);

    res.json({
      success: true,
      message: 'کد تایید صحیح است',
    });
  } catch (error) {
    console.error('Verify reset code error:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در تایید کد',
    });
  }
});

// Reset password - set new password after SMS verification
router.post('/reset-password', async (req, res) => {
  try {
    const { phone, newPassword, code } = req.body;

    if (!phone || !newPassword || !code) {
      return res.status(400).json({
        success: false,
        message: 'شماره تلفن، کد تایید و رمز عبور جدید الزامی است',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
      });
    }

    // Verify code one more time before resetting password
    const storedData = resetCodes.get(phone);

    if (!storedData || storedData.code !== code) {
      return res.status(400).json({
        success: false,
        message: 'کد تایید نامعتبر است',
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

    // Delete the used code
    resetCodes.delete(phone);

    console.log('✅ رمز عبور با موفقیت تغییر کرد:', phone);

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

// Register for an event
router.post('/register-event', async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({
        success: false,
        message: 'شناسه کاربر و ایونت الزامی است',
      });
    }

    // Find user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر یافت نشد',
      });
    }

    // Get current registered events
    let registeredEvents = user.registeredEvents || [];

    // Check if already registered
    const eventIdStr = String(eventId);
    if (registeredEvents.some(id => String(id) === eventIdStr)) {
      return res.status(400).json({
        success: false,
        message: 'شما قبلاً در این ایونت ثبت نام کرده‌اید',
      });
    }

    // Add event to registered events
    registeredEvents.push(Number(eventId));
    user.registeredEvents = registeredEvents;
    await user.save();

    res.json({
      success: true,
      message: 'ثبت نام در ایونت با موفقیت انجام شد',
      registeredEvents: user.registeredEvents,
    });
  } catch (error) {
    console.error('Register event error:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ثبت نام ایونت',
    });
  }
});

// Unregister from an event
router.post('/unregister-event', async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({
        success: false,
        message: 'شناسه کاربر و ایونت الزامی است',
      });
    }

    // Find user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر یافت نشد',
      });
    }

    // Get current registered events
    let registeredEvents = user.registeredEvents || [];

    // Remove event from registered events
    const eventIdStr = String(eventId);
    registeredEvents = registeredEvents.filter(id => String(id) !== eventIdStr);
    
    user.registeredEvents = registeredEvents;
    await user.save();

    res.json({
      success: true,
      message: 'لغو ثبت نام از ایونت با موفقیت انجام شد',
      registeredEvents: user.registeredEvents,
    });
  } catch (error) {
    console.error('Unregister event error:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در لغو ثبت نام ایونت',
    });
  }
});

// Get user's registered events
router.get('/registered-events/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'شناسه کاربر الزامی است',
      });
    }

    // Find user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر یافت نشد',
      });
    }

    res.json({
      success: true,
      registeredEvents: user.registeredEvents || [],
    });
  } catch (error) {
    console.error('Get registered events error:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت ایونت‌های ثبت نام شده',
    });
  }
});

module.exports = router;

