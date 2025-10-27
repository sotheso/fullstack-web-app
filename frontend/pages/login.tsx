import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Title, Subtitle, InputPill, PrimaryButton, ErrorNotice } from '../components/CompLog';

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for success message from URL params
  useEffect(() => {
    if (mounted && router.query.message === 'password-reset-success') {
      setSuccessMessage('رمز عبور شما با موفقیت تغییر کرد. حالا می‌توانید وارد شوید.');
    }
  }, [router.query, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!/^0\d{10}$/.test(phone)) {
      setError('شماره موبایل را درست وارد کنید.');
      return;
    }

    if (!password || password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Save user to localStorage and redirect
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      } else {
        setError(data.message || 'خطا در ورود');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  

  return (
    <>
      <Head>
        <title>ورود - Davvvat</title>
        <meta name="description" content="صفحه ورود به سیستم Davvvat" />
      </Head>

      <div className="login-page">
        <div className="signin-container">
          <Title>!به دعوت خوش اومدی</Title>
          <Subtitle>وارد حساب کاربری خود شوید</Subtitle>

          <form onSubmit={handleSubmit} className="signin-form" dir="rtl">
            <InputPill
              type="tel"
              inputMode="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/[^\d]/g, ''))}
              required
              placeholder="مثال: 09123456789  -  شماره تماس به انگلیسی"
            />

            <InputPill
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="رمز عبور خود را وارد کنید"
            />

            {error && (<ErrorNotice>{error}</ErrorNotice>)}

            {mounted && successMessage && (
              <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {successMessage}
              </div>
            )}

            <PrimaryButton type="submit" isLoading={isLoading}>
              {isLoading ? 'در حال ورود...' : 'ورود'}
            </PrimaryButton>
          </form>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button 
              type="button" 
              onClick={handleForgotPassword}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#F26430', 
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline'
              }}
            >
              فراموشی رمز عبور
            </button>
          </div>

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
