import Header from './components/header/Header';
import Posts from './components/posts/Posts';
import { Routes, Route} from "react-router-dom";
import CreatePage from './components/create/CreatePage.js';
import Thread from './components/thread/Thread.js';
import SearchResults from './components/results/SearchResults';
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import AuthContext from './AuthContext';
import ViewProfile from './components/profile/ViewProfile';
import SavedPosts from './components/profile/SavedPosts';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  return (
    <AuthContext.Provider value={{ 
    isLoggedIn, setIsLoggedIn, 
    userId, setUserId, 
    showAuthModal, setShowAuthModal, 
    showReport, setShowReport 
    }}>
      <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/board/"/>} />
              <Route path='/board/:boardId?' element={     
                <Posts />
              }/>
              <Route path="create" element={<CreatePage />} />
              <Route path="thread/:postId" element={<Thread />} />
              <Route path="search/:query" element={<SearchResults />} />
              <Route path="profile" element={<ViewProfile />} />
              <Route path="saved" element={<SavedPosts />} />

              <Route path="/*" element={<div>
                <p>404</p>
              </div>} />

          </Routes>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
