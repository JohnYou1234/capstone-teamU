import { formatDate } from "../../helpers.js";
import ContentDropdown from '../posts/ContentDropdown';
import './Comment.css';
function Comment ({ comment, index, highlightQuery, first, isLink }) {
    const content = highlightQuery
    ? comment.content.replace(
        new RegExp(`(${highlightQuery})`, "gi"),
        "<mark>$1</mark>"
      )
    : comment.content;

  return (
    <div
      key={index}
      style={{ backgroundColor: `${comment.bgColor}` }}
      className="comment"
    >
      <div className="flex-row">
          {comment.date ? <p>{formatDate(comment.date)}</p> : <p></p>}
          {(!first && !highlightQuery) && (!isLink) && <ContentDropdown dataId={comment._id} />}
      </div>
      <div className="comment-content">
        {highlightQuery ? (
            <span dangerouslySetInnerHTML={{ __html: content }}></span>
        ) : (
            <p>{content}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
