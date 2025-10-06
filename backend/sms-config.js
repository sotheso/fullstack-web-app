// SMS Configuration
// SendByBaseNumber API (SOAP)

module.exports = {
  // پنل پیامکی - احراز هویت با username/password
  username: '989051539473',
  password: '613ab7e8-7f3e-474a-bd3b-ae07ec7740bb',

  // شماره فرستنده
  from: '50002710039473',

  // API endpoint
  apiUrl: 'http://api.payamak-panel.com/post/send.asmx/SendByBaseNumber',

  // Template ID در پنل
  bodyId: 376312,

  // Template text: کاربرگرامی، کد ورود به دعوت: {0}
  // متغیر {0} با کد تأیید جایگزین می‌شود

  // Test phone number (for testing purposes)
  testPhone: '09051539473'
};

// Instructions:
// 1. Go to payamak-panel.com
// 2. Create an account or login
// 3. Get your username and password from the dashboard
// 4. Get your sender number
// 5. Replace the values above
// 6. Restart the server: npm run dev
