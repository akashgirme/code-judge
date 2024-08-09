import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Client-side middleware running...');
    const refreshToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('refreshToken='));

    if (refreshToken) {
      navigate('/');
    }
  }, [navigate]);

  return { children };
};

export default AuthMiddleware;
