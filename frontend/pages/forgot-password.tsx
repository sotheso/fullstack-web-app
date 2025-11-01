import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Title, Subtitle, InputPill, PrimaryButton, ErrorNotice } from '../components/CompLog';

export default function ForgotPassword() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('phone'); // 'phone', 'verify', 'password'

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!/^0\d{10}$/.test(phone)) {
      setError('شماره موبایل را درست وارد کنید.');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStep('verify');
        setError('');
        // برای تست در حالت demo
        if (data.demoCode) {
          console.log('🔧 Demo Code:', data.demoCode);
        }
      } else {
        setError(data.message || 'خطا در ارسال کد بازیابی');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!verificationCode || verificationCode.length !== 6) {
      setError('کد تایید باید ۶ رقم باشد.');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/auth/verify-reset-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code: verificationCode }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStep('password');
        setError('');
      } else {
        setError(data.message || 'کد تایید اشتباه است');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!newPassword || newPassword.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('رمز عبور و تأیید رمز عبور مطابقت ندارند.');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, newPassword, code: verificationCode }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Redirect to login page
        router.push('/login?message=password-reset-success');
      } else {
        setError(data.message || 'خطا در تغییر رمز عبور');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleBackToVerify = () => {
    setStep('verify');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <>
      <Head>
        <title>بازیابی رمز عبور - Davvvat</title>
        <meta name="description" content="بازیابی رمز عبور حساب کاربری Davvvat" />
      </Head>

      <div className="login-page">
        <div className="signin-container">
          {step === 'phone' && (
            <>
              <Title>بازیابی رمز عبور</Title>
              <Subtitle>شماره تلفن خود را وارد کنید</Subtitle>

              <form onSubmit={handleSendCode} className="signin-form" dir="rtl">
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

                {error && (<ErrorNotice>{error}</ErrorNotice>)}

                <PrimaryButton type="submit" isLoading={isLoading}>
                  {isLoading ? 'در حال بررسی...' : 'ادامه'}
                </PrimaryButton>
              </form>

              <div className="login-signup">
                <p className="login-signup-text">
                  رمز عبور خود را به یاد دارید؟{' '}
                  <a href="/login" className="login-link">ورود کنید</a>
                </p>
              </div>
            </>
          )}

          {step === 'verify' && (
            <>
              <Title>تایید شماره تلفن</Title>
              <Subtitle>کد تایید ارسال شده به شماره {phone} را وارد کنید</Subtitle>

              <form onSubmit={handleVerifyCode} className="signin-form" dir="rtl">
                <InputPill
                  type="tel"
                  inputMode="numeric"
                  id="verificationCode"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value.replace(/[^\d]/g, '').slice(0, 6))}
                  required
                  placeholder="کد ۶ رقمی"
                  maxLength={6}
                />

                {error && (<ErrorNotice>{error}</ErrorNotice>)}

                <PrimaryButton type="submit" isLoading={isLoading}>
                  {isLoading ? 'در حال تایید...' : 'تایید کد'}
                </PrimaryButton>
              </form>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <button 
                  type="button" 
                  onClick={handleBackToPhone}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#666', 
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  تغییر شماره
                </button>
              </div>
            </>
          )}

          {step === 'password' && (
            <>
              <Title>رمز عبور جدید</Title>
              <Subtitle>رمز عبور جدید خود را برای شماره {phone} وارد کنید</Subtitle>

              <form onSubmit={handleResetPassword} className="signin-form" dir="rtl">
                <InputPill
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  placeholder="رمز عبور جدید (حداقل ۶ کاراکتر)"
                />

                <InputPill
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="تأیید رمز عبور جدید"
                />

                {error && (<ErrorNotice>{error}</ErrorNotice>)}

                <PrimaryButton type="submit" isLoading={isLoading}>
                  {isLoading ? 'در حال تغییر...' : 'تغییر رمز عبور'}
                </PrimaryButton>
              </form>

              <div style={{ marginTop: '16px', textAlign: 'center', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button 
                  type="button" 
                  onClick={handleBackToVerify}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#666', 
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ویرایش کد تایید
                </button>
                <span style={{ color: '#ddd' }}>|</span>
                <button 
                  type="button" 
                  onClick={handleBackToPhone}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#666', 
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  تغییر شماره
                </button>
              </div>
            </>
          )}

          <div className="login-footer">
            <p>© 2024 Davvvat. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </div>
    </>
  );
}
