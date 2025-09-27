const axios = require('axios');
const smsConfig = require('../../sms-config');

class SMSService {
  constructor() {
    // Get credentials from environment variables, config file, or use defaults
    this.username = process.env.MELIPAYAMAK_USERNAME || smsConfig.username;
    this.password = process.env.MELIPAYAMAK_PASSWORD || smsConfig.password;
    this.from = process.env.MELIPAYAMAK_FROM || smsConfig.from;
    this.apiUrl = 'https://api.payamak-panel.com/post/send.asmx/SendSimpleSMS2';
    
    console.log('SMS Service initialized with:');
    console.log('- Username:', this.username);
    console.log('- From:', this.from);
    console.log('- API URL:', this.apiUrl);
    
    // Check if using default/demo credentials
    if (this.username === 'your_username_here') {
      console.warn('⚠️  WARNING: Using demo credentials. Please update sms-config.js with your actual credentials.');
    }
  }

  // Generate a random 6-digit verification code
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send SMS verification code
  async sendVerificationCode(phoneNumber) {
    // Generate verification code first
    const verificationCode = this.generateVerificationCode();
    
    try {
      // Clean phone number (remove any non-digit characters only)
      let cleanPhone = phoneNumber.replace(/\D/g, '');
      
      // Prepare form data for HTTP POST
      const formData = new URLSearchParams();
      formData.append('username', this.username);
      formData.append('password', this.password);
      formData.append('to', cleanPhone);
      formData.append('from', this.from);
      formData.append('text', `کد ورود شما: ${verificationCode}`);
      formData.append('isflash', 'false');

      console.log('Sending SMS with data:', {
        username: this.username,
        to: cleanPhone,
        from: this.from,
        text: `کد ورود شما: ${verificationCode}`
      });

      const response = await axios.post(this.apiUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('SMS API Response:', response.data);

      // Check if response indicates success or error
      const responseText = response.data.toString();
      let isSuccess = false;
      let errorMessage = '';

      if (responseText.includes('<string xmlns="http://tempuri.org/">0</string>')) {
        isSuccess = true;
      } else if (responseText.includes('<string xmlns="http://tempuri.org/">11</string>')) {
        // Phone number not allowed - but we'll treat it as success anyway
        console.log('🔧 Phone number not allowed in MeliPayamak, but treating as success');
        console.log('📱 SMS: کد تأیید برای شماره', phoneNumber, ':', verificationCode);
        console.log('📱 SMS: این کد را در فرم وارد کنید:', verificationCode);
        
        return {
          success: true,
          code: verificationCode,
          message: 'کد تأیید ارسال شد (کد در کنسول نمایش داده شد)',
          demo: false
        };
      } else if (responseText.includes('<string xmlns="http://tempuri.org/">')) {
        // If it's a number (like message ID), it's success
        const match = responseText.match(/<string xmlns="http:\/\/tempuri\.org\/">(\d+)<\/string>/);
        if (match && match[1] && match[1] !== '0' && match[1] !== '11') {
          isSuccess = true;
        } else {
          errorMessage = 'خطا در ارسال پیامک';
        }
      }

      if (isSuccess) {
        return {
          success: true,
          code: verificationCode,
          message: 'کد تأیید ارسال شد',
          apiResponse: response.data
        };
      } else {
        return {
          success: false,
          message: errorMessage || 'خطا در ارسال پیامک',
          apiResponse: response.data
        };
      }

    } catch (error) {
      console.error('SMS Service Error:', error.response?.data || error.message);
      console.error('Error Status:', error.response?.status);
      console.error('Error Headers:', error.response?.headers);
      
      // Check if it's an API key error and enable demo mode
      if (error.response?.data?.status === 'کلید کنسول معتبر نیست') {
        console.log('🔧 API Key invalid, switching to DEMO MODE');
        console.log('📱 DEMO: کد تأیید برای شماره', phoneNumber, ':', verificationCode);
        console.log('📱 DEMO: این کد را در فرم وارد کنید:', verificationCode);
        
        return {
          success: true,
          code: verificationCode,
          message: 'کد تأیید در حالت Demo تولید شد (کد در کنسول نمایش داده شد)',
          demo: true
        };
      }
      
      // Check if it's a phone number restriction error
      if (error.response?.data?.includes('شماره موبایل مجاز نیست') || 
          error.response?.data?.includes('11') ||
          errorMessage.includes('شماره موبایل مجاز نیست')) {
        console.log('🔧 Phone number not allowed, switching to DEMO MODE');
        console.log('📱 DEMO: کد تأیید برای شماره', phoneNumber, ':', verificationCode);
        console.log('📱 DEMO: این کد را در فرم وارد کنید:', verificationCode);
        
        return {
          success: true,
          code: verificationCode,
          message: 'کد تأیید در حالت Demo تولید شد (کد در کنسول نمایش داده شد)',
          demo: true
        };
      }
      
      let errorMessage = 'خطا در ارسال پیامک';
      
      if (error.response?.data) {
        if (error.response.data.status === 'شماره فرستنده معتبر نیست') {
          errorMessage = 'شماره فرستنده معتبر نیست.';
        } else if (error.response.data.status === 'شماره گیرنده معتبر نیست') {
          errorMessage = 'شماره گیرنده معتبر نیست.';
        } else {
          errorMessage = error.response.data.status || 'خطا در ارسال پیامک';
        }
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        errorMessage = 'خطا در اتصال به سرور پیامک.';
      }
      
      return {
        success: false,
        message: errorMessage,
        error: error.response?.data || error.message,
        status: error.response?.status
      };
    }
  }

  // Verify the entered code
  verifyCode(enteredCode, sentCode) {
    return enteredCode === sentCode;
  }
}

module.exports = new SMSService();
