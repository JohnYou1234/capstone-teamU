import { useState, useContext } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import CreateBoard from './CreateBoard';
import './BoardList.css';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import FilterBar from './Filterbar';
import AuthContext from '../../AuthContext';

function BoardList(props) {
  const showList = props.showList;
  const { isLoggedIn, setShowAuthModal } = useContext(AuthContext);

  const handleClose = () => props.handleClose();
  const [showCreate, changeCreateView] = useState(false);
  const handleCreateClose = () => changeCreateView(false);
  const handleCreateOpen = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      changeCreateView(true);
    }
  }

  const [refresh, setRefresh] = useState(false);
  const [boards, setBoards] = useState([]);

  const [filterText, setFilterText] = useState('');
  useEffect(() => {
    fetch('/api/boards/viewAll')
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Error loading boards');
      }
      return res.text()
    })
    .then(data => {
      console.log(data);
      if (data.success) {
        setBoards(data.boards)
      } else {
        throw new Error('Error loading boards');
      }
    })
    .catch(err => console.log(err))
  }, [refresh]);
  const filteredBoards = boards.filter(board => {
    return board.name.toLowerCase().includes(filterText.toLowerCase());
  });
  return (
    <>
      <Offcanvas show={showList} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Packs
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='createBoard' onClick={handleCreateOpen}>
              <span><FiPlus /></span>
              <span>Create Pack</span>
          </div>
          {/* filter bar */}
          <FilterBar filterText={filterText} setFilterText={setFilterText}/>
          <nav className='boardList'>
            <Link className='unstyledLink' to="/board/"><p>General</p></Link>
            {filteredBoards.map(board => {
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