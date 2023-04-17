import { useState, useContext, useEffect } from 'react';
import './ContentDropdown.css';
import AuthContext from '../../AuthContext';
function ContentDropdown({ dataId, isPost, userId, handleReportOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, setShowAuthModal } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = async () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    if (!dataId) {
      throw new Error('No post or comment id provided');
    }
    try {
      const endpoint = isPost ? '/api/users/save/post' : '/api/users/save/comment';
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, dataId }),
        credentials: 'include',
      });
      setIsSaved(true);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleUnsave = async () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    if (!dataId) {
      throw new Error('No post or comment id provided');
    }
    try {
      const endpoint = isPost ? '/api/users/unsave/post' : '/api/users/unsave/comment';
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, dataId }),
        credentials: 'include',
      });
      setIsSaved(false);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleReport = async () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    if (!dataId) {
      throw new Error('No post or comment id provided');
    }
    handleReportOpen();
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    if (!dataId) {
      throw new Error('No id provided');
    }
  }, [isLoggedIn, dataId]);
  return (
    <div className='move-right'>
      <div className="post-preview-dd">
        <div className="dd-toggle" onClick={toggleMenu}>
          <div className="ellipsis"></div>
          <div className="ellipsis"></div>
          <div className="ellipsis"></div>
        </div>
        {menuOpen && (
          <div className="dd-menu">
            <div className="dd-item" onClick={isSaved ? handleUnsave: handleSave}>
              {isSaved ? 'Unsave' : 'Save'}
            </div>
            <div className="dd-item" onClick={handleReport}>
              Report
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentDropdown;
