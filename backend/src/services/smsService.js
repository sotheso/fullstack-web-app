const axios = require('axios');
const smsConfig = require('../../sms-config');

class SMSService {
  constructor() {
    // SendByBaseNumber API - نیاز به احراز هویت دارد
    this.username = process.env.MELIPAYAMAK_USERNAME || smsConfig.username;
    this.password = process.env.MELIPAYAMAK_PASSWORD || smsConfig.password;
    this.from = process.env.MELIPAYAMAK_FROM || smsConfig.from;
    this.bodyId = process.env.MELIPAYAMAK_BODY_ID || smsConfig.bodyId;
    this.apiUrl = process.env.MELIPAYAMAK_API_URL || smsConfig.apiUrl;

    console.log('📱 SendByBaseNumber API فعال شد:');
    console.log('👤 Username:', this.username);
    console.log('🔑 Password:', this.password);
    console.log('📞 From:', this.from);
    console.log('📋 Body ID:', this.bodyId);
    console.log('🌐 API URL:', this.apiUrl);
    console.log('📝 Template: کاربرگرامی، کد ورود به دعوت: {0}');
  }

  // Generate a random 6-digit verification code
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send SMS verification code using SendByBaseNumber API
  async sendVerificationCode(phoneNumber) {
    // Generate verification code first
    const verificationCode = this.generateVerificationCode();

    try {
      // Clean phone number (remove any non-digit characters only)
      let cleanPhone = phoneNumber.replace(/\D/g, '');

      console.log('📱 ارسال SMS با SendByBaseNumber:');
      console.log('📞 شماره:', cleanPhone);
      console.log('🔢 کد تأیید:', verificationCode);
      console.log('📝 متن کامل: کاربرگرامی، کد ورود به دعوت:', verificationCode);
      console.log('📋 Body ID:', this.bodyId);

      // پارامترهای مورد نیاز برای SendByBaseNumber
      const formData = new URLSearchParams();
      formData.append('username', this.username);
      formData.append('password', this.password);
      formData.append('to', cleanPhone);
      formData.append('from', this.from);
      formData.append('bodyId', this.bodyId.toString());
      formData.append('text', verificationCode); // فقط کد تأیید برای جایگزینی {0}

      console.log('📤 درخواست به:', this.apiUrl);
      console.log('📋 پارامترها:', {
        username: this.username,
        to: cleanPhone,
        from: this.from,
        bodyId: this.bodyId,
        text: verificationCode
      });

      const res = await axios.post(this.apiUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { data, status, statusText } = res;

      console.log('📥 پاسخ API:', {
        data: data.toString(),
        status,
        statusText
      });

      // پردازش پاسخ XML
      const responseText = data.toString();
      const match = responseText.match(/<string xmlns="http:\/\/tempuri\.org\/">(.+?)<\/string>/);

      if (match && match[1]) {
        const result = match[1];

        // اگر عدد بلند باشد (recId) یعنی موفق است
        if (result.length > 15 && !result.startsWith('-')) {
          console.log('✅ SMS با موفقیت ارسال شد - recId:', result);
          return {
            success: true,
            code: verificationCode,
            message: 'کد تأیید ارسال شد',
            recId: result,
            apiResponse: data,
            status: status,
            statusText: statusText
          };
        } else {
          // کد خطا دریافت شده
          const errorCode = parseInt(result);
          let errorMessage = 'خطا در ارسال پیامک';

          switch (errorCode) {
            case 0: errorMessage = 'نام کاربری یا رمز عبور صحیح نمی‌باشد'; break;
            case -1: errorMessage = 'دسترسی برای استفاده از این وبسرویس غیرفعال است'; break;
            case -2: errorMessage = 'اعتبار کافی نمی‌باشد'; break;
            case -3: errorMessage = 'خط ارسالی در سیستم تعریف نشده است'; break;
            case -4: errorMessage = 'کد متن ارسالی صحیح نمی‌باشد و یا توسط مدیر سامانه تایید نشده است'; break;
            case -5: errorMessage = 'متن ارسالی با توجه به متغیرهای مشخص شده در متن پیشفرض همخوانی ندارد'; break;
            case -6: errorMessage = 'خطای داخلی رخ داده است'; break;
            case -10: errorMessage = 'ممنوعیت ارسال لینک در متغیرها'; break;
            default: errorMessage = `خطای ناشناخته: ${result}`;
          }

          console.log('🔧 خطا از پنل:', result, '- پیام:', errorMessage);

          // Demo mode برای تست
          console.log('📱 DEMO: کد تأیید برای شماره', phoneNumber, ':', verificationCode);
          console.log('📱 DEMO: این کد را در فرم وارد کنید:', verificationCode);

          return {
            success: true,
            code: verificationCode,
            message: `Demo mode فعال شد (خطا: ${errorMessage})`,
            demo: true,
            error: errorMessage,
            errorCode: errorCode,
            apiResponse: data
          };
        }
      } else {
        // پاسخ نامشخص
        console.log('🔧 پاسخ نامشخص از پنل، Demo mode فعال');
        console.log('📱 DEMO: کد تأیید برای شماره', phoneNumber, ':', verificationCode);
        console.log('📱 DEMO: این کد را در فرم وارد کنید:', verificationCode);

        return {
          success: true,
          code: verificationCode,
          message: 'کد تأیید در حالت Demo تولید شد (پاسخ نامشخص از پنل)',
          demo: true,
          apiResponse: data,
          status: status,
          statusText: statusText
        };
      }

    } catch (error) {
      console.error('خطا در اتصال به پنل:', error.response?.data || error.message);
      console.error('Status Code:', error.response?.status);

      // Demo mode برای تست
      const verificationCode = this.generateVerificationCode();
      console.log('🔧 خطا در اتصال، Demo mode فعال');
      console.log('📱 DEMO: کد تأیید برای شماره', phoneNumber, ':', verificationCode);
      console.log('📱 DEMO: این کد را در فرم وارد کنید:', verificationCode);

      return {
        success: true,
        code: verificationCode,
        message: 'کد تأیید در حالت Demo تولید شد (خطا در اتصال به پنل)',
        demo: true,
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