import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: null,
  setUserId: () => {},
  showAuthModal: false,
  setShowAuthModal: () => {},
});

export default AuthContext;
