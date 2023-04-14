import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import './dropdown.css'
import AuthContext from '../../AuthContext';
function ProfileDropdown() {
    const {setIsLoggedIn, setUserId} = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const handleSignOut = () => {
        setIsLoggedIn(false);
        setUserId(null);
    }
    return (
        <div
          className="profile-dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="nav-link">Profile</span>
          {showDropdown && (
            <div className="profile-dropdown-content">
              <Link to="/profile">View Profile</Link>
              <Link to="/saved">Saved Posts</Link>
              <span className='fake-link' onClick={handleSignOut}>Sign Out</span>
            </div>
          )}
        </div>
      );
}

export default ProfileDropdown;