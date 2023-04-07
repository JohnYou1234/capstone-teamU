import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import PostPreview from '../posts/PostPreview';
import Comment from '../thread/Comment';
import { Link, useParams } from 'react-router-dom';
import Tabs from './Tabs';
import { Spinner } from 'react-bootstrap';

function SearchResults() {
  const [activeTab, setActiveTab] = useState('Posts');
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [boards, setBoards] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { query } = useParams();

  useEffect(() => {
    setLoading(true);
    if (query !== "") {
      if (activeTab === 'Comments') {
        fetchData(`/api/comments/search?q=${query}`)
          .then((data) => setComments(data.comments))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      } else if (activeTab === 'Posts') {
        fetchData(`/api/posts/search?q=${query}`)
          .then((data) => setPosts(data.posts))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      } else if (activeTab === 'Boards') {
        fetchData(`/api/boards/search?q=${query}`)
          .then((data) => setBoards(data.boards))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      }
    } 
    setLoading(false);
  }, [query, activeTab]);
  const fetchData = (endpoint) => {
    return fetch(endpoint)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Error loading data');
        }
      });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const activeStyle = {
    backgroundColor: 'rgb(166, 121, 202)',
    color: '#fff',
    borderRadius: '10px',
    padding: '0.5rem'
  };

  return (
    <div className="search-results">
      <h3>Search results for "{query}"</h3>
      <Tabs
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        activeStyle={activeStyle}
      />
      {activeTab === 'Posts' && (
        <>
          <h3>Posts</h3>
          {posts.length === 0 && isLoading && <div className='center-div'><Spinner animation="border" /></div>}
          {posts.length !== 0 && posts.map((post, index) => (
            <PostPreview key={index} postData={post} highlightQuery={query} />
          ))}
          {posts.length === 0 && !isLoading && <p>No posts found</p>}
        </>
      )}
      {activeTab === 'Comments' && (
        <>
          <h3>Comments</h3>
          {comments.length === 0 && isLoading && <div className='center-div'><Spinner animation="border" /></div>}
          {comments.length !== 0 && comments.map((comment, index) => (
            <Link key={index} className="unstyled-link" to={`/thread/${comment.post}`}>
              <Comment comment={comment} index={index} highlightQuery={query} />
            </Link>
          ))}
          {comments.length === 0 && !isLoading && <p>No comments found</p>}
        </>
      )}
      {activeTab === 'Boards' && (
        <>
          <h3>Boards</h3>
          {boards.length === 0 && isLoading && <div className='center-div'><Spinner animation="border" /></div>}
          {boards.length !== 0 && boards.map((board, index) => (
            <Link key={index} className="unstyled-link" to={`/board/${board._id}`}>
              <div className="board" key={index}>
                <label>{board.name}</label>
                <p>{board.description}</p>
              </div>
            </Link>
          ))}
          {boards.length === 0 && !isLoading && <p>No boards found</p>}
        </>
      )}
    </div>
  );
}  

export default SearchResults;
