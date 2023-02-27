import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './header.css';
import {useState} from 'react';
import BoardList from './BoardList.js';

function Header() {
  const [showList, setShowList] = useState(false);
  const closeList = () => setShowList(false);
  const openList = () => setShowList(true);
  return (
    <>
      <Navbar variant="dark" expand="lg" className='custom-nav'>
        <Container>
          <Navbar.Brand href="/">Howler</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <a onClick={() => { openList()}} className="nav-link">Boards</a>
              </Nav.Item>
              <Nav.Item className='d-flex align-items-center'>
              {/* found this on codepen  https://codepen.io/kmuenster/pen/XWWeQGw*/}
              <div className="searchBar"> 
                <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" />
              </div>
              </Nav.Item>
              <Nav.Item>
                <a href="/create" className="nav-link">Create</a>
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