import { useState } from 'react';
import Head from 'next/head';

export default function SignIn() {
  const [phone, setPhone] = useState('');
  const [accept, setAccept] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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
      await new Promise(r => setTimeout(r, 1000));
      alert('ثبت نام اولیه انجام شد (نمونه)');
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <>
      <Head>
        <title>ثبت نام - Davvvat</title>
      </Head>

      <div className="signin-page">
        <div className="signin-container">
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
        </div>
      </div>
    </>
  );
}


