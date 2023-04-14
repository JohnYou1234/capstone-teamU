import PostPreview from './PostPreview';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './post.css';
import { Spinner } from 'react-bootstrap';
import FilterBox from './FilterBox';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [boardName, setBoardName] = useState('General');
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPostType, setSelectedPostType] = useState("All");
  
    const handlePostUpdate = (data) => {
      setPosts(data);
    }
  
    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
    };
  
    const handlePostTypeSelect = (postType) => {
      setSelectedPostType(postType);
    };
  
    const {boardId} = useParams();
    let link = boardId === undefined ? '/api/posts/viewAllGeneral' : `/api/posts/viewAllPosts/${boardId}`;

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
          setFeedback(err);
          setLoading(false);
        });
  
      if (boardId) {
        fetch(`/api/boards/getBoardName/${boardId}`)
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setBoardName(data.board.name);
            } else {
              throw new Error('Error loading board name');
            }
          })
          .catch(err => {
            setFeedback(err);
          });
      } else {
        setBoardName('General');
      }
    }, [boardId, link]);
  
    const filterPosts = (posts) => {
        let filteredPosts = [...posts];
      
        if (selectedCategory !== 'All') {
          filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
        }
      
        if (selectedPostType !== 'All') {
          filteredPosts = filteredPosts.filter(post => {
            const type = post.type ? post.type.toLowerCase() : 'text';
            return type === selectedPostType.toLowerCase();
          });
        }      
      
        return filteredPosts;
      };
      
  
    const filteredPosts = filterPosts(posts);
  
    return (
      <div className='postsDiv'>  
        <FilterBox onCategorySelect={handleCategorySelect} onPostTypeSelect={handlePostTypeSelect} />
        <div className='boardInfo'>
          <h3>{boardName}</h3>
        </div>     
        {loading ? 
    <div className='spinner center-div'>
        <Spinner animation="border" role="status"/>
    </div> :
    filteredPosts.length > 0 ? 
        <div className="posts autoLr">
            <ResponsiveMasonry columnsCountBreakPoints={{730: 1, 968: 2, 1730: 3}}>
                <Masonry className='masonry'>
                    {filteredPosts.map((post, index) => {
                        return (
                            <PostPreview key={index} postData={post}/>
                        )
                    })}
                </Masonry>
            </ResponsiveMasonry>
            <p>{feedback}</p>
        </div> :
            <p className='center-div'>No posts found</p>
        }
      </div>
    );
  }
  
  export default Posts;  