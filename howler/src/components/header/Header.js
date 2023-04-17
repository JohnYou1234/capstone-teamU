import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './header.css';
import { useState, useContext } from 'react';
import BoardList from '../boards/BoardList';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import AuthModal from '../authentication/AuthModal';
import AuthContext from '../../AuthContext';
import ProfileDD from '../profile/ProfileDD';
function Header() {
  const [showList, setShowList] = useState(false);
  const closeList = () => { setShowList(false); }
  const openList = () => setShowList(true);
  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);
  const { isLoggedIn, showAuthModal, setShowAuthModal} = useContext(AuthContext);

  return (
    <>
      <Navbar variant="dark" expand="lg" className='custom-nav'>
        <Container>
          <Navbar.Brand><Link to="/" className="nav-link">Howler</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <span onClick={openList} className="nav-link">Boards</span>
              </Nav.Item>
              <Nav.Item className='d-flex align-items-center'>
                <SearchBar />
              </Nav.Item>
              <Nav.Item>
                <Link to="/create" className="nav-link">Create</Link>
              </Nav.Item>
              <Nav.Item>
                {!isLoggedIn ? (
                  <span onClick={openAuthModal} className="nav-link">
                    Login
                  </span>
                ) : (
                  <ProfileDD />
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BoardList showList={showList} handleClose={closeList} handleOpen={openList} />
      <AuthModal show={showAuthModal} onHide={closeAuthModal} />
    </>
  );
};

export default Header;
