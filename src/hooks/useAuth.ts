import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { User } from '../types';

export const useAuth = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const handleLogin = (userData: User) => {
    login(userData);
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return {
    user,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
    isSeller: user?.role === 'seller',
    isBuyer: user?.role === 'buyer',
    isAdmin: user?.role === 'admin',
  };
};
