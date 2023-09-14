import { useEffect, useState } from 'react';
import { ToastProps } from '../types/kiosk';

function Toast({ message, isVisible, onClose }: ToastProps) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);

    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!show) return null;

  return (
    <div className="fixed px-4 py-2 text-white bg-blue-600 rounded-md shadow-lg bottom-5 right-5">
      {message}
    </div>
  );
};

export default Toast;