import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./Thread.css"; // import CSS file
import Comments from "./Comments"; 
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import CommentInput from "./CommentInput";
import {formatDate} from '../../helpers.js';

function Thread() {
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
        if (post.board) {
            fetch(`http://localhost:3080/api/boards/getBoardName/${post.board}`)
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
    }, []);
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="thread-container">
                    <Link to="/" className="close-button">
                        <AiOutlineClose /> Close
                    </Link>
                    <div className="thread-post" style={{ backgroundColor: `${post.bgColor}`}} >
                        <div className="thread-post-header">
                            <h2>{post.title}</h2>
                            <p>{boardName}</p>
                        </div>
                        <p>{formatDate(post.date)}</p>
                        <div className="thread-post-content">
                            <p>{post.content}</p>
                        </div>
                    </div>
                    <CommentInput postId={postId} setRefresh={setRefresh} refresh={refresh}/>
                    <Comments postId={postId} refresh={refresh}/>
                </div>
            )}
        </>
    );
}

export default Thread;
