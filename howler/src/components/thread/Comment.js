import { formatDate } from "../../helpers.js";
import ContentDropdown from '../posts/ContentDropdown';
import CreateReport from '../Report/CreateReport';
import { useState } from "react";
function Comment ({ comment, index, highlightQuery, first, isLink }) {
  const [showReport, setShowReport] = useState(false);
  const handleReportClose = () => setShowReport(false);
  const handleReportShow = () => setShowReport(true);

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
          {(!first && !highlightQuery) && (!isLink) && <ContentDropdown dataId={comment._id} handleReportOpen={handleReportShow}/>}
          {(!first && !highlightQuery) && (!isLink) && <CreateReport show={showReport} dataId={comment._id} isPost={false} handleClose={handleReportClose}/>}
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
