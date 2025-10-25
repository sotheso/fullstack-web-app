import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CompleteProfile() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get phone from query params or session
    const phoneFromQuery = router.query.phone as string;
    if (phoneFromQuery) {
      setPhone(phoneFromQuery);
    } else {
      // If no phone, redirect back to signin
      router.push('/signin');
    }
  }, [router.query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!firstName.trim()) {
      setError('لطفاً اسم خود را وارد کنید.');
      return;
    }
    if (!lastName.trim()) {
      setError('لطفاً نام خانوادگی خود را وارد کنید.');
      return;
    }
    if (!email.trim()) {
      setError('لطفاً ایمیل خود را وارد کنید.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('لطفاً یک ایمیل معتبر وارد کنید.');
      return;
    }
    if (!password.trim()) {
      setError('لطفاً رمز عبور خود را وارد کنید.');
      return;
    }
    if (password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
      return;
    }
    if (password !== confirmPassword) {
      setError('رمز عبور و تکرار آن یکسان نیستند.');
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || '/api'}/auth/complete-profile`;
      console.log('Environment variables:', process.env.NEXT_PUBLIC_API_URL);
      console.log('API URL:', apiUrl);
      console.log('Request data:', { phone, firstName, lastName, email, password });
      
      // Test if backend is running
      try {
        const testResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}`);
        console.log('Backend test response:', testResponse.status);
      } catch (testError) {
        console.error('Backend connection test failed:', testError);
        setError('سرور در حال اجرا نیست. لطفاً با مدیر سیستم تماس بگیرید.');
        setIsLoading(false);
        return;
      }
      console.log('Environment variables:', process.env.NEXT_PUBLIC_API_URL);
      console.log('API URL:', apiUrl);
      console.log('Request data:', { phone, firstName, lastName, email, password });
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          firstName,
          lastName,
          email,
          password,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Complete profile response:', data);

      if (data.success) {
        // Save user data to localStorage
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          console.log('User data saved to localStorage:', data.user);
        }
        // Redirect to main page
        router.push('/');
      } else {
        setError(data.message || 'خطا در ثبت اطلاعات');
      }
    } catch (error) {
      console.error('Complete profile error:', error);
      setError(`خطا در ارتباط با سرور: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>تکمیل ثبت نام - Davvvat</title>
      </Head>

      <div className="signin-page">
        <div className="signin-container">
          <h1 className="signin-title">!به دعوت خوش اومدی</h1>
          <p className="signin-subtitle">لطفاً اطلاعات خود را تکمیل کنید</p>

          <form onSubmit={handleSubmit} className="signin-form" dir="rtl">
            <div style={{ width: '100%', maxWidth: '520px' }}>
              <label className="signin-label">اسمت:</label>
              <div className="signin-input-wrap">
                <input
                  className="signin-input"
                  type="text"
                  placeholder="محمد"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
              </div>
            </div>

            <div style={{ width: '100%', maxWidth: '520px' }}>
              <label className="signin-label">نام خانوادگی:</label>
              <div className="signin-input-wrap">
                <input
                  className="signin-input"
                  type="text"
                  placeholder="محمدی"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div style={{ width: '100%', maxWidth: '520px' }}>
              <label className="signin-label">ایمیلت:</label>
              <div className="signin-input-wrap">
                <input
                  className="signin-input"
                  type="email"
                  dir="ltr"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div style={{ width: '100%', maxWidth: '520px' }}>
              <label className="signin-label">رمز عبور:</label>
              <div className="signin-input-wrap">
                <input
                  className="signin-input"
                  type="password"
                  placeholder="حداقل ۶ کاراکتر"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div style={{ width: '100%', maxWidth: '520px' }}>
              <label className="signin-label">تکرار رمز عبور:</label>
              <div className="signin-input-wrap">
                <input
                  className="signin-input"
                  type="password"
                  placeholder="رمز عبور را دوباره وارد کنید"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {error && <div className="signin-error">{error}</div>}

            <button type="submit" className="signin-button" disabled={isLoading}>
              {isLoading ? 'در حال ثبت...' : 'ثبت نام نهایی'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

