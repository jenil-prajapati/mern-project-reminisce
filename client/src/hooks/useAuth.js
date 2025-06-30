import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useAuth = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();

  useEffect(() => {
    const token = user?.token;

    // JWT token expiration check
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

  const login = (userData) => {
    localStorage.setItem('profile', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('profile');
    setUser(null);
    dispatch({ type: 'LOGOUT' });
  };

  return { user, login, logout };
}; 