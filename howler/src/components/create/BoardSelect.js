import React, {useEffect, useState} from 'react';
function BoardSelect(props) {
    const board = props.board;
    const handleBoardChange = props.handleBoardChange;
    const [boards, setBoards] = useState([]);
    useEffect(() => {
        fetch('/api/boards/viewAll')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setBoards(data.boards);
          } else {
            console.log(data.message);
          }
        })
        .catch(err => console.log(err))
      }, []);
    return (
        <div>
            <select name="board" className="create-post-input" value={board} onChange={handleBoardChange}>
                <option value=''>General</option>
                {boards.map(board => {
                    return (
                        <option key={board._id} value={board._id + "," + board.name}>{board.name}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default BoardSelect;