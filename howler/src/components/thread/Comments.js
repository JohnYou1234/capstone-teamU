import React, {useState, useEffect} from 'react';
import './Thread.css';
// import format date from helper.js
import {formatDate} from '../../helpers.js';
function Comments(props) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3080/api/comments/viewAll/${props.postId}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setComments(data.comments);
                setLoading(false);
            } else {
                setLoading(false);
                throw new Error('Error loading comments');
            }
        })
        .catch(err => {
            console.log(err)
        });
    }, [props.refresh]);
    const Comment = ({comment, index}) => {
        return (
            <div key={index} style={{backgroundColor: `${comment.bgColor}`}} className="comment">
                <div className="comment-header">
                    <p>{formatDate(comment.date)}</p>
                </div>
                <div className="comment-content">
                    <p>{comment.content}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="thread-comments">
            <h3>Comments</h3>
            {comments.map((comment, index) => {
                return <Comment comment={comment} index={index} key={index}/>;
            })}
        </div>
    )
}

export default Comments;