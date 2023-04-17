import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: null,
  setUserId: () => {},
  showAuthModal: false,
  setShowAuthModal: () => {},
  setShowReport: () => {},
  showReport: false,
});

export default AuthContext;
