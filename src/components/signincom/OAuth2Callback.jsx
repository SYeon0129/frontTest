import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const deleteCookie = (name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const token = getCookieValue('token');
    const refreshToken = getCookieValue('refreshToken');
    const name = getCookieValue('name');
    const email = getCookieValue('email');

    if (token && refreshToken && name && email) {
      localStorage.setItem('bbs_access_token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', name);
      localStorage.setItem('id', email);

      // 쿠키 삭제
      deleteCookie('token');
      deleteCookie('refreshToken');
      deleteCookie('name');
      deleteCookie('email');

      navigate('/');
    } else {
      console.error('Missing token, refreshToken, name or email in cookies');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuth2Callback;
