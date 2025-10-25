import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Title, Subtitle, InputPill, PrimaryButton, ErrorNotice } from '../components/CompLog';

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'verify'
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (step === 'phone') {
      if (!/^0\d{10}$/.test(phone)) {
        setError('شماره موبایل را درست وارد کنید.');
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/sms/send-code`, {
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
        } else {
          setError(data.message || 'خطا در ارسال پیامک');
        }
      } catch (error) {
        setError('خطا در ارتباط با سرور');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Verify code step
      if (!verificationCode || verificationCode.length !== 6) {
        setError('کد تأیید ۶ رقمی را وارد کنید.');
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/sms/verify-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone, code: verificationCode }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (data.userExists) {
            // User exists - save to localStorage and redirect
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/');
          } else {
            // User doesn't exist - redirect to signup
            router.push(`/signin?phone=${encodeURIComponent(phone)}`);
          }
        } else {
          setError(data.message || 'کد تأیید اشتباه است');
        }
      } catch (error) {
        setError('خطا در ارتباط با سرور');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setVerificationCode('');
    setError('');
  };

  

  return (
    <>
      <Head>
        <title>ورود - Davvvat</title>
        <meta name="description" content="صفحه ورود به سیستم Davvvat" />
      </Head>

      <div className="signin-page">
        <div className="signin-container">
          {step === 'phone' ? (
            <>
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

                {error && (<ErrorNotice>{error}</ErrorNotice>)}

                <PrimaryButton type="submit" isLoading={isLoading}>
                  {isLoading ? 'در حال ارسال...' : 'ادامه'}
                </PrimaryButton>
              </form>

              <div className="login-signup">
                <p className="login-signup-text">
                  حساب کاربری ندارید؟{' '}
                  <a href="/signin" className="login-link">ثبت نام کنید</a>
                </p>
              </div>
            </>
          ) : (
            <>
              <Title>کد تأیید</Title>
              <Subtitle>کد ۶ رقمی ارسال شده به شماره {phone} را وارد کنید</Subtitle>

              <form onSubmit={handleSubmit} className="signin-form" dir="rtl">
                <InputPill
                  type="text"
                  inputMode="decimal"
                  id="verificationCode"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value.replace(/[^\d]/g, '').slice(0, 6))}
                  required
                  placeholder="کد ۶ رقمی (به صورت انگلیسی)"
                  maxLength={6}
                />

                {error && (<ErrorNotice>{error}</ErrorNotice>)}

                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                  <PrimaryButton type="submit" isLoading={isLoading}>
                    {isLoading ? 'در حال تأیید...' : 'تأیید کد'}
                  </PrimaryButton>
                  
                  <button 
                    type="button" 
                    onClick={handleBackToPhone}
                    className="signin-button"
                    style={{ backgroundColor: '#666', marginTop: '10px' }}
                  >
                    تغییر شماره
                  </button>
                </div>
              </form>
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
