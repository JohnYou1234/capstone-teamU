import PostPreview from './PostPreview';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './post.css';
// react bootstrap loading 
import { Spinner } from 'react-bootstrap';
function Posts () {
    const [posts, setPosts] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [boardName, setBoardName] = useState('General');
    const [loading, setLoading] = useState(true);
    const handlePostUpdate = (data) => {
        setPosts(data);
    }

    const {boardId} = useParams();
    let link = boardId === undefined ? 'http://localhost:3080/api/posts/viewAll' : `http://localhost:3080/api/posts/viewAllPosts/${boardId}`;
    useEffect(() => {
        fetch(link)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                handlePostUpdate(data.posts);
                setLoading(false);
            } else {
                throw new Error('Error loading posts');
            }
        })
        .catch(err => {
            setFeedback(err)
            setLoading(false);  
        });
        if (boardId) {
            fetch(`http://localhost:3080/api/boards/getBoardName/${boardId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setBoardName(data.board.name);
                    } else {
                        throw new Error('Error loading board name');
                    }
                })
                .catch(err => {
                    setFeedback(err)
                });
            } else {
                setBoardName('General');
            }
    }, [boardId]);
    return (
        <div className='postsDiv'>  
            <div className='boardInfo'>
                <h3>{boardName}</h3>
            </div>     
            {loading ? <div className='spinner'><Spinner animation="border" role="status"/></div>  :
                <div className="posts autoLr">
                        <ResponsiveMasonry
                        columnsCountBreakPoints={{730: 1, 968: 2, 1730: 3}}
                    >
                            <Masonry className='masonry'>
                            {posts.length === 0 && !loading ? <p>No posts found</p>
                            :
                            posts.map((post, index) => {
                                return (
                                    <PostPreview key={index} postData={post}/>
                                )
                            })}
                            
                            </Masonry>
                    </ResponsiveMasonry>
                    <p>{feedback}</p>
                </div>
            }
        </div>
    );
}
export default Posts;
