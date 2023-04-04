import {formatDate} from '../../helpers.js';
const Comment = ({comment, index}) => {
    return (
        <div key={index} style={{backgroundColor: `${comment.bgColor}`}} className="comment">
            <div className="comment-header">
                {comment.date ? <p>{formatDate(comment.date)}</p>: <p></p>} 
            </div>
            <div className="comment-content">
                <p>{comment.content}</p>
            </div>
        </div>
    )
}

export default Comment;