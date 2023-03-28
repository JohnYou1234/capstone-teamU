import './post.css'
import {Link} from 'react-router-dom';
import {formatDate} from '../../helpers.js';
import { useEffect, useState } from 'react';
function PostPreview (props) {
    let data = props.postData;
    let bcolor = data.bgColor;
    const [boardName, setBoardName] = useState('');
    useEffect(() => {
        if (data.board) {
            fetch(`/api/boards/getBoardName/${data.board}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setBoardName(data.board.name);
                    } else {
                        throw new Error('Error loading board name');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                setBoardName('General');
            }
        }, [data.board]);

    return (
        <Link to={`/thread/${data._id}`} className="post-link">
            <div className="post" style={{ backgroundColor: `${bcolor}` }} onClick={() => {console.log("hello")}}>
                <p className="category">{data.category}</p>
                <p className="title">{data.title}</p>
                <p className='boardName'>{boardName}</p>
                <p className="date">{formatDate(data.date)}</p>
                {parsePostContent(data)}
            </div>
        </Link>
      );
}

function parsePostContent(data) {
    if (data.type === "image") {
        return <img className="preview-img" src={data.content} alt="post content"/>;
    } else {
        return <p className="content">{cutContentShort(data.content)}</p>;
    }
}
function cutContentShort(content) {
    if (content.length > 300) {
        return content.slice(0, 300) + "...";
    }
    return content;
}

export default PostPreview;
