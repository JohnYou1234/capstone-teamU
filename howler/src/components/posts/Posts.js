import Post from './Post';
import {postData} from '../../data/post_data.js';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import React, {useState, useEffect} from 'react';
function Posts () {
    const [posts, setPosts] = useState([]);
    const [feedback, setFeedback] = useState('');
    const handlePostUpdate = (data) => {
        setPosts(data);
    }
    useEffect(() => {
        fetch('http://localhost:3080/api/posts/viewAll')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                handlePostUpdate(data.posts);
            } else {
                throw new Error('Error loading posts');
            }
        })
        .catch(err => {
            setFeedback(err)
        });
    }, []);
    return (
        <div className="posts">
                <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 730: 2, 1062: 3, 1400: 4, 1730: 5}}
            >
                <Masonry className='masonry'>
                {posts.length === 0 ? <p>No posts found</p>
                :
                posts.map((post, index) => {
                    return (
                        <Post key={index} postData={post}/>
                    )
                })}
                
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
}
export default Posts;
