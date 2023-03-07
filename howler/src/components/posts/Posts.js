import PostPreview from './PostPreview';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
function Posts () {
    const [posts, setPosts] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [boardName, setBoardName] = useState('General');
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
            } else {
                console.log(data.err)
                throw new Error('Error loading posts');
            }
        })
        .catch(err => {
            setFeedback(err)
        });
        // /getBoardName/:id
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
        <>
        <div className='boardInfo'>
            <h3>{boardName}</h3>
        </div>     
        <div className="posts">
                <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 730: 2, 1062: 3, 1400: 4, 1730: 5}}
            >
                <Masonry className='masonry'>
                {posts.length === 0 ? <p>No posts found</p>
                :
                posts.map((post, index) => {
                    return (
                        <PostPreview key={index} postData={post}/>
                    )
                })}
                
                </Masonry>
            </ResponsiveMasonry>
        </div>
        </>
    );
}
export default Posts;
