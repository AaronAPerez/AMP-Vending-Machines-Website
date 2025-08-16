import { Toaster } from 'react-hot-toast';

export const toastConfig = {
  duration: 4000,
  position: 'top-right' as const,
  style: {
    background: '#333',
    color: '#fff',
  },
  success: {
    duration: 3000,
    iconTheme: {
      primary: '#22c55e',
      secondary: '#fff',
    },
  },
  error: {
    duration: 5000,
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  },
};