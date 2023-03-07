import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import CreateBoard from './CreateBoard';
import './BoardList.css';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
function BoardList(props) {
  const showList = props.showList;
  const handleClose = () => props.handleClose();
  const [showCreate, changeCreateView] = useState(false);
  const handleCreateClose = () => changeCreateView(false);
  const handleCreateOpen = () => changeCreateView(true);

  const [refresh, setRefresh] = useState(false);
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    fetch('/api/boards/viewAll')
    .then(res => res.json())
    .then(data => {
      setBoards(data.boards)
    })
    .catch(err => console.log(err))
  }, [refresh]);

  return (
    <>
      <Offcanvas show={showList} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Boards
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='createBoard' onClick={handleCreateOpen}>
            <span><FiPlus /></span>
            <span>Create Board</span>
        </div>
        {/* filter bar */}
        <input type={'text'} placeholder={'Filter Boards'} className={'boardFilterBar'}/>
          <nav className='boardList'>
            <Link className='unstyledLink' to="/board/"><p>General</p></Link>
            {boards.map(board => {
              return ( <Link className='unstyledLink' key={board._id} to={`/board/${board._id}`}><p>{board.name}</p></Link>)
            })}
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
      <CreateBoard refresh={refresh} setRefresh={setRefresh} handleClose={handleCreateClose} show={showCreate}/>
    </>
  );
}

export default BoardList;