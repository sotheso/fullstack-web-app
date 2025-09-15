import { useState } from 'react';
import Head from 'next/head';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Here you can add your login logic later
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show success message
      alert('ورود موفقیت‌آمیز بود! (این فقط یک تست است)');
      
    } catch (err) {
      setError('خطا در ورود. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <>
      <Head>
        <title>ورود - Davvvat</title>
        <meta name="description" content="صفحه ورود به سیستم Davvvat" />
      </Head>

      <div className="login-page">
        <div className="login-container">
          {/* Logo */}
          <div className="login-logo">
            <img src="/logoo.png" alt="Davvvat logo" className="login-logo-img" />
            <h1 className="login-welcome">!به دعوت خوش اومدی</h1>
            <p className="login-subtitle">وارد حساب کاربری خود شوید</p>
          </div>

          {/* Login Form */}
          <div className="login-card">
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="login-label">
                  ایمیل
                </label>
                <div className="login-input-wrap">
                  <span className="login-input-dot" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="login-input"
                    placeholder="ایمیل خود را وارد کنید"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="login-label">
                  رمز عبور
                </label>
                <div className="login-input-wrap">
                  <span className="login-input-dot" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="login-input"
                    placeholder="رمز عبور خود را وارد کنید"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="login-remember-row">
                <div className="login-remember-left">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="login-checkbox"
                  />
                  <label htmlFor="remember-me" className="login-remember-label">
                    مرا به خاطر بسپار
                  </label>
                </div>
                <a href="#" className="login-link">
                  فراموشی رمز عبور؟
                </a>
              </div>

              {/* Error Message */}
              {error && (<div className="login-error">{error}</div>)}

              {/* Submit Button */}
              <button type="submit" disabled={isLoading} className="login-button">
                {isLoading ? (
                  <>
                    <span className="login-spinner" />
                    در حال ورود...
                  </>
                ) : (
                  'ورود'
                )}
              </button>
            </form>

            {/* Minimal UI (social buttons removed) */}

            {/* Sign Up Link */}
            <div className="login-signup">
              <p className="login-signup-text">
                حساب کاربری ندارید؟{' '}
                <a href="/signin" className="login-link">
                  ثبت نام کنید
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="login-footer">
            <p>© 2024 Davvvat. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </div>
    </>
  );
}
