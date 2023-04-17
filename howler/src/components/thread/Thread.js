import React, {useContext, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import "./Thread.css"; // import CSS file
import Comments from "./Comments"; 
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import CommentInput from "./CommentInput";
import {formatDate} from '../../helpers.js';
import { Spinner } from 'react-bootstrap';
import AuthContext from '../../AuthContext';
import ContentDropdown from '../posts/ContentDropdown';
import CreateReport from '../Report/CreateReport';
function Thread() {
    const {isLoggedIn, userId} = useContext(AuthContext);
    const [showReport, setShowReport] = useState(false);

    const handleReportClose = () => setShowReport(false);
    const handleReportShow = () => setShowReport(true);
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const {postId} = useParams();
    const [refresh, setRefresh] = useState(false);
    const [boardName, setBoardName] = useState('');
    useEffect(() => {
        fetch(`/api/posts/viewOne/${postId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setPost(data.post);
                    setLoading(false);
                } else {
                    setLoading(false);
                    throw new Error('Error loading post');
                }
            })
            .catch(err => {
                console.log(err)
            });
        if (post.boardName) {
            setBoardName(post.boardName);
        } else if (post.board) {
            fetch(`/api/boards/getBoardName/${post.board}`)
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
    }, [post.board, post.boardName, postId]);
    
    return (
        <>
            {loading ? (
                <div className='spinner center-div'><Spinner animation="border" role="status"/></div>
            ) : (
                <>
                <div className="thread-container">
                    <Link to="/" className="close-button">
                        <AiOutlineClose /> Close
                    </Link>
                    <div className="thread-post" style={{ backgroundColor: `${post.bgColor}`}} >
                        <ContentDropdown dataId={postId} isPost={true} handleReportOpen={handleReportShow}/>
                        <div className="thread-post-header">
                            <h2>{post.title}</h2>
                            <p>{boardName}</p>
                        </div>
                        <p>{formatDate(post.date)}</p>
                        <div className="thread-post-content">
                            {parsePostContent(post)}
                        </div>
                    </div>
{                    isLoggedIn ? <CommentInput postId={postId} setRefresh={setRefresh} refresh={refresh} userId={userId} isLoggedIn={isLoggedIn}/>
                    : <p className='center'>Please login to comment</p>}
                    <Comments postId={postId} refresh={refresh}/>
                </div>
                <CreateReport show={showReport} dataId={postId} isPost={true} handleClose={handleReportClose}/>
                </>
            )}
        </>
    );
}
function parsePostContent(data) {
    if (data.type === "image") {
        return <img className="post-img" src={data.content} alt="post content"/>;
    } else {
        return <p className="content">{data.content}</p>;
    }
}
export default Thread;
