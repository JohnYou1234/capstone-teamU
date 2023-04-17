import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../AuthContext';
import Tabs from '../results/Tabs';
import { Spinner } from 'react-bootstrap';
import FilterBox from '../posts/FilterBox';
import PostPreview from '../posts/PostPreview';
import Comment from '../thread/Comment';

function SavedPosts() {
  const { userId, isLoggedIn } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('Posts');
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPostType, setSelectedPostType] = useState("All");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handlePostTypeSelect = (postType) => {
    setSelectedPostType(postType);
  };

  useEffect(() => {
    if (isLoggedIn) {
        setLoading(true);
        if (activeTab === 'Comments') {
          fetchData(`/api/users/saved/comments`)
            .then((data) => setComments(data.comments))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        } else if (activeTab === 'Posts') {
          fetchData(`/api/users/saved/posts`)
            .then((data) => setPosts(data.posts))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        }
    }
  }, [userId, activeTab]);

  const fetchData = (endpoint) => {
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Error fetching data');
        }
        return res.json();
      });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const activeStyle = {
    backgroundColor: 'rgb(166, 121, 202)',
    color: '#fff',
    borderRadius: '10px',
    padding: '0.5rem',
  };

  const filterResults = (results) => {
    let filteredResults = [...results];

    if (selectedCategory !== "All") {
      filteredResults = filteredResults.filter((result) => result.category === selectedCategory);
    }

    if (selectedPostType !== "All") {
      filteredResults = filteredResults.filter((result) => {
        const type = result.type ? result.type.toLowerCase() : "text";
        return type === selectedPostType.toLowerCase();
      });
    }

    return filteredResults;
  };

  const filteredPosts = filterResults(posts);
  const filteredComments = filterResults(comments);
  const userExists = userId === null ? false : true;

  return (
    userExists ? (
      <div className="results">
        <FilterBox onCategorySelect={handleCategorySelect} onPostTypeSelect={handlePostTypeSelect} />
        <Tabs
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          activeStyle={activeStyle}
          noBoard={true}
        />
        {activeTab === 'Posts' && (
          <>
            <h3>Saved Posts</h3>
            {filteredPosts.length === 0 && isLoading && <div className='center-div'><Spinner animation="border" /></div>}
            {filteredPosts.length !== 0 && filteredPosts.map((post, index) => (
              <PostPreview key={index} postData={post} />
            ))}
            {filteredPosts.length === 0 && !isLoading && <p>No saved posts found</p>}
          </>
        )}
        {activeTab === 'Comments' && (
          <>
            <h3>Saved Comments</h3>
            {filteredComments.length === 0 && isLoading && <div className='center-div'><Spinner animation="border" /></div>}
            {filteredComments.length !== 0 && filteredComments.map((comment, index) => (
              <Link key={index} className="unstyled-link" to={`/thread/${comment.post}`}>
                <Comment comment={comment} index={index} isLink />
              </Link>
            ))}
            {filteredComments.length === 0 && !isLoading && <p>No saved comments found</p>}
          </>
        )}
      </div>
    ) : (
      <div className="results">
        <h3>Log in to view your saved posts and comments</h3>
      </div>
    )
  );
  
}
export default SavedPosts;
         
