import { useState } from 'react';
import Head from 'next/head';
import { Logo, Title, Subtitle, InputPill, PrimaryButton, ErrorNotice } from '../components/CompLog';

export default function Login() {
  const [formData, setFormData] = useState({
    phone: '',
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

      <div className="signin-page">
        <div className="signin-container">
          <Logo />
          <Title>!به دعوت خوش اومدی</Title>
          <Subtitle>وارد حساب کاربری خود شوید</Subtitle>

          <form onSubmit={handleSubmit} className="signin-form" dir="rtl">
            <InputPill
              type="tel"
              inputMode="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder= "مثال: 09123456789  -  شماره تماس به انگلیسی"
            />

            <InputPill
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="رمز عبور خود را وارد کنید"
            />

            <div className="login-remember-row">
              <div className="login-remember-left">
                <input id="remember-me" name="remember-me" type="checkbox" className="login-checkbox" />
                <label htmlFor="remember-me" className="login-remember-label">مرا به خاطر بسپار</label>
              </div>
              <span className="login-remember-sep">|</span>
              <a href="/signin" className="login-link">فراموشی رمز عبور؟</a>
            </div>

            {error && (<ErrorNotice>{error}</ErrorNotice>)}

            <PrimaryButton type="submit" isLoading={isLoading}>ورود</PrimaryButton>
          </form>

          <div className="login-signup">
            <p className="login-signup-text">
              حساب کاربری ندارید؟{' '}
              <a href="/signin" className="login-link">ثبت نام کنید</a>
            </p>
          </div>

          <div className="login-footer">
            <p>© 2024 Davvvat. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </div>
    </>
  );
}
