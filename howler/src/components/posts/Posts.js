<<<<<<< HEAD
import Post from './Post';
=======
import PostPreview from './PostPreview';
>>>>>>> development
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import React, {useState, useEffect} from 'react';
// posts
function Posts () {
    const [posts, setPosts] = useState([]);
    const [feedback, setFeedback] = useState('');
    const handlePostUpdate = (data) => {
        setPosts(data);
    }
    useEffect(() => {
        fetch('/api/posts/viewAll')
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
                        <PostPreview key={index} postData={post}/>
                    )
                })}
                
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
}
export default Posts;
