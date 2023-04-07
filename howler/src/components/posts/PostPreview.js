import './post.css'
import {Link} from 'react-router-dom';
import {formatDate} from '../../helpers.js';
import { useEffect, useState } from 'react';

function PostPreview (props) {
  const data = props.postData;
  const bcolor = data.bgColor;
  const [boardName, setBoardName] = useState('');
  const [highlightedTitle, setHighlightedTitle] = useState('');
  const [highlightedContent, setHighlightedContent] = useState('');

  useEffect(() => {
    if (data.boardName) {
      setBoardName(data.boardName);
    } else if (!data.board) {
      setBoardName("General");
    } else {
      fetch(`/api/boards/getBoardName/${data.board}`)
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            setBoardName(res.board.name);
          } else {
            console.log(data)
            setBoardName("General");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [data.board]);

  useEffect(() => {
    if (props.highlightQuery) {
      setHighlightedTitle(highlightText(data.title, props.highlightQuery));
      setHighlightedContent(highlightText(data.content, props.highlightQuery));
    } else {
      setHighlightedTitle(data.title);
      setHighlightedContent(data.content);
    }
  }, [props.highlightQuery, data.title, data.content]);

  return (
    <Link to={`/thread/${data._id}`} className="post-link">
      <div className="post" style={{ backgroundColor: `${bcolor}` }} onClick={() => {console.log("hello")}}>
        <p className="category">{data.category}</p>
        <p className="title" dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
        <p className='boardName'>{boardName}</p>
        <p className="date">{formatDate(data.date)}</p>
        {parsePostContent(highlightedContent, props.highlightQuery)}
      </div>
    </Link>
  );
}

function parsePostContent(content, highlightQuery) {
  if (highlightQuery) {
    return <p className="content" dangerouslySetInnerHTML={{ __html: highlightText(cutContentShort(content), highlightQuery) }} />;
  } else {
    return <p className="content">{cutContentShort(content)}</p>;
  }
}

function cutContentShort(content) {
  if (content.length > 300) {
    return content.slice(0, 300) + "...";
  }
  return content;
}

function highlightText(text, query) {
  const re = new RegExp(`(${query})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

export default PostPreview;
