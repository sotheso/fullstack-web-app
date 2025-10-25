const express = require('express');
const router = express.Router();
const smsService = require('../services/smsService');
const User = require('../models/User');

// Test endpoint to debug SMS issues
router.get('/test', async (req, res) => {
  try {
    const testPhone = '09123456789';
    console.log('Testing SMS service with phone:', testPhone);
    
    const result = await smsService.sendVerificationCode(testPhone);
    
    res.json({
      success: result.success,
      message: result.message,
      error: result.error,
      status: result.status,
      apiResponse: result.apiResponse
    });
  } catch (error) {
    console.error('Test SMS Error:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در تست SMS',
      error: error.message
    });
  }
});

// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map();

// Send verification code
router.post('/send-code', async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate phone number (accept any phone number format)
    if (!phone || phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'شماره موبایل را درست وارد کنید'
      });
    }

    // Send SMS
    const result = await smsService.sendVerificationCode(phone);

    if (result.success) {
      // Store the verification code temporarily (expires in 5 minutes)
      verificationCodes.set(phone, {
        code: result.code,
        timestamp: Date.now(),
        attempts: 0
      });

      // Clean up expired codes
      setTimeout(() => {
        verificationCodes.delete(phone);
      }, 5 * 60 * 1000); // 5 minutes

      res.json({
        success: true,
        message: result.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message
      });
    }

  } catch (error) {
    console.error('Send code error:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در سرور'
    });
  }
});

// Verify code
router.post('/verify-code', async (req, res) => {
  try {
    const { phone, code } = req.body;

    // Validate inputs
    if (!phone || !code) {
      return res.status(400).json({
        success: false,
        message: 'شماره موبایل و کد تأیید الزامی است'
      });
    }

    // Check if code exists for this phone
    const storedData = verificationCodes.get(phone);
    
    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: 'کد تأیید یافت نشد یا منقضی شده است'
      });
    }

    // Check if code has expired (5 minutes)
    const now = Date.now();
    const codeAge = now - storedData.timestamp;
    if (codeAge > 5 * 60 * 1000) {
      verificationCodes.delete(phone);
      return res.status(400).json({
        success: false,
        message: 'کد تأیید منقضی شده است'
      });
    }

    // Check attempts limit
    if (storedData.attempts >= 3) {
      verificationCodes.delete(phone);
      return res.status(400).json({
        success: false,
        message: 'تعداد تلاش‌های مجاز تمام شده است'
      });
    }

    // Verify the code
    if (smsService.verifyCode(code, storedData.code)) {
      // Code is correct, remove it from storage
      verificationCodes.delete(phone);
      
      // Check if user exists in database
      try {
        const user = await User.findOne({ where: { phone } });
        
        if (user) {
          // User exists - update last login
          user.lastLogin = new Date();
          await user.save();
          
          res.json({
            success: true,
            message: 'کد تأیید صحیح است',
            userExists: true,
            user: {
              id: user.id,
              phone: user.phone,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              isProfileComplete: user.isProfileComplete,
              isVerified: user.isVerified
            }
          });
        } else {
          // User doesn't exist - new registration
          res.json({
            success: true,
            message: 'کد تأیید صحیح است',
            userExists: false,
            user: null
          });
        }
      } catch (dbError) {
        console.error('Database error in verify-code:', dbError);
        res.json({
          success: true,
          message: 'کد تأیید صحیح است',
          userExists: false
        });
      }
    } else {
      // Increment attempts
      storedData.attempts++;
      verificationCodes.set(phone, storedData);

      res.status(400).json({
        success: false,
        message: 'کد تأیید اشتباه است'
      });
    }

  } catch (error) {
    console.error('Verify code error:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در سرور'
    });
  }
});

module.exports = router;
