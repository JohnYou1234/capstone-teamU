import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import CreateBoard from './CreateBoard';
function BoardList(props) {
  const showList = props.showList;
  const handleClose = () => props.handleClose();
  const [showCreate, changeCreateView] = useState(false);
  const handleCreateClose = () => changeCreateView(false);
  const handleCreateOpen = () => changeCreateView(true);
  return (
    <>
      <Offcanvas show={showList} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            My Boards
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='createBoard' onClick={handleCreateOpen}>
            <span><FiPlus /></span>
            <span>Create Board</span>
        </div>
          <nav className='boardList'>
            <p>General</p>
            <p>Boxers</p>
            <p>Gamers</p>
            <p>Informatics</p>
            <p>Senior Year Students</p>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
      <CreateBoard handleClose={handleCreateClose} show={showCreate}/>
    </>
  );
}

export default BoardList;