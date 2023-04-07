import { formatDate } from "../../helpers.js";

function Comment ({ comment, index, highlightQuery }) {
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
      <div className="comment-header">
        {comment.date ? <p>{formatDate(comment.date)}</p> : <p></p>}
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
