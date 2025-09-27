import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [accept, setAccept] = useState(false);
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
      if (!accept) {
        setError('لطفاً قوانین را بپذیرید.');
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5001/api/sms/send-code', {
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
        const response = await fetch('http://localhost:5001/api/sms/verify-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone, code: verificationCode }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Redirect to login or main page after successful verification
          router.push('/login');
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
        <title>ثبت نام - Davvvat</title>
      </Head>

      <div className="signin-page">
        <div className="signin-container">
          {step === 'phone' ? (
            <>
              <h1 className="signin-title">!شما دعوت شدید</h1>
              <p className="signin-subtitle">لطفا شماره‌ات رو وارد کن تا از ایونت‌ها و اتفاقات باخبر باشی. <a href="/login" className="signin-link">قبلا ثبت نام کردم</a></p>

              <form onSubmit={handleSubmit} className="signin-form" dir="rtl">
                <div className="signin-input-wrap">
                  <input
                    className="signin-input"
                    type="tel"
                    inputMode="tel"
                    placeholder="مثال: 09123456789  -  شماره تماس به انگلیسی"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                {error && <div className="signin-error">{error}</div>}

                <label className="signin-terms">
                  <input type="checkbox" checked={accept} onChange={e => setAccept(e.target.checked)} />
                  <span>
                    با ثبت نام در دعوت <a href="#">قوانین و شرایط</a> و <a href="#">بیانیه حریم خصوصی</a> را قبول می‌کنم.
                  </span>
                </label>

                <button type="submit" className="signin-button" disabled={isLoading}>
                  {isLoading ? 'در حال ارسال...' : 'ادامه'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="signin-title">کد تأیید</h1>
              <p className="signin-subtitle">کد ۶ رقمی ارسال شده به شماره {phone} را وارد کنید</p>

              <form onSubmit={handleSubmit} className="signin-form" dir="rtl">
                <div className="signin-input-wrap">
                  <input
                    className="signin-input"
                    type="text"
                    inputMode="numeric"
                    placeholder="کد ۶ رقمی"
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                  />
                </div>

                {error && <div className="signin-error">{error}</div>}

                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                  <button type="submit" className="signin-button" disabled={isLoading}>
                    {isLoading ? 'در حال تأیید...' : 'تأیید کد'}
                  </button>
                  
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
        </div>
      </div>
    </>
  );
}


