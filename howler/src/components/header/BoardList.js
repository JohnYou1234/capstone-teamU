import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import './header.css';
function BoardList(props) {
    const showList = props.showList;
    const handleClose = props.handleClose;
    return (
        <>
        <Offcanvas show={showList} onHide={handleClose} placement="start">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Boards</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <input type="text" placeholder='Filter...' className='boardFilterBar'/>
            <nav className='boardList'>
                <p>Senior Year Students</p>
                <p>Informatics</p>
                <p>Gamers</p>
            </nav>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
};

export default BoardList;