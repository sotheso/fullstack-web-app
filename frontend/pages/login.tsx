import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSuccess = () => {
    const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
    router.push(`${BASE_PATH}/`);
  };

  const handleSwitchToRegister = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm
          onSuccess={handleSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      ) : (
        <RegisterForm
          onSuccess={handleSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  );
};

export default AuthPage; 