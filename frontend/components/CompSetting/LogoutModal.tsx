import React from 'react';
import { useRouter } from 'next/router';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const router = useRouter();

  const handleConfirm = () => {
    onConfirm();
    router.push('/signin');
  };

  if (!isOpen) return null;

  return (
    <div className="logout-modal">
      <div className="logout-modal-content">
        <h2 className="logout-modal-title">خروج از حساب کاربری</h2>
        <div className="logout-modal-divider"></div>
        <p className="logout-modal-message">
          آیا میخواهید از حساب کاربری خود خارج شوید؟
        </p>
        <div className="logout-modal-buttons">
          <button 
            className="logout-modal-button cancel"
            onClick={onClose}
          >
            خیر
          </button>
          <button 
            className="logout-modal-button confirm"
            onClick={handleConfirm}
          >
            بله
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
