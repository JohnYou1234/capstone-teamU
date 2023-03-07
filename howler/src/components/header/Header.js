import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './header.css';
import {useState} from 'react';
import BoardList from '../boards/BoardList';
import {Link} from 'react-router-dom';

function Header() {
  const [showList, setShowList] = useState(false);
  const closeList = () => {setShowList(false);}
  const openList = () => setShowList(true);
  return (
    <>
        <Navbar variant="dark" expand="lg" className='custom-nav'>
        <Container>
          <Navbar.Brand><Link to="/" className="nav-link">Howler</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <span onClick={() => { openList()}} className="nav-link">Boards</span>
              </Nav.Item>
              <Nav.Item className='d-flex align-items-center'>
              {/* found this on codepen  https://codepen.io/kmuenster/pen/XWWeQGw*/}
              <div className="searchBar"> 
                <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" />
              </div>
              </Nav.Item>
              <Nav.Item>
                <Link to="/create" className="nav-link">Create</Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BoardList showList={showList} handleClose={closeList} handleOpen={openList}/>
    </>
  );
};

export default Header;