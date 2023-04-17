import './post.css'
import { useNavigate } from 'react-router-dom';
import {formatDate} from '../../helpers.js';
import { useEffect, useState } from 'react';
import ContentDropdown from './ContentDropdown';
import CreateReport from '../Report/CreateReport';
function PostPreview (props) {
  const data = props.postData;
  const bcolor = data.bgColor;
  const [boardName, setBoardName] = useState('');
  const [highlightedTitle, setHighlightedTitle] = useState('');
  const [highlightedContent, setHighlightedContent] = useState('');
  const [showReport, setShowReport] = useState(false);
  const handleReportClose = () => setShowReport(false);
  const handleReportShow = () => setShowReport(true);
  const navigate = useNavigate();
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

  const handleClick = (e) => {
      if (e.target.className === "ellipsis" || e.target.className === "dd-toggle" || e.target.className === "dd-item") {
          return;
      } else {
          navigate(`/thread/${data._id}`);
      }
  };
  return (
    <>
    <div className="post-link" onClick={handleClick}>
      <div className="post" style={{ backgroundColor: `${bcolor}` }}>
        <div className='flex-row'>
          <p className="category">{data.category}</p>
          <ContentDropdown dataId={data._id} isPost={true} handleReportOpen={handleReportShow}/>
        </div>
        {parsePostContent(highlightedTitle, props.highlightQuery, "title")}
        <p className='boardName'>{boardName}</p>
        <p className="date">{formatDate(data.date)}</p>
        {parsePostContent(highlightedContent, props.highlightQuery, "content", data.type==="image")}
      </div>
    </div>
    <CreateReport show={showReport} dataId={data._id} isPost={true} handleClose={handleReportClose}/>
    </>

  );
}

function parsePostContent(content, highlightQuery, type, isImage) {
    if (isImage) {
        return <img className='preview-img' src={content} alt="post content" />;
    }
    if (highlightQuery) {
        return <p className={type} dangerouslySetInnerHTML={{ __html: highlightText(cutContentShort(content), highlightQuery) }} />;
    } else {
        return <p className={type}>{cutContentShort(content)}</p>;
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