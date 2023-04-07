import React, { useState } from 'react';
import './create.css';
import Tabs from './Tabs';
import TabContent from './TabContent';
import ColorPalette from './ColorPalette';
import BoardSelect from './BoardSelect';
import ContentGuidelines from './ContentGuidelines';
function CreatePost() {
  const [feedback, setFeedback] = useState('');

  const [tab, setTab] = useState('text');
  const handleTabChange = (tab) => {
    setTab(tab);
  };
  const [isDisabled, setIsDisabled] = useState(false);
  const handleDisable = (bool) => {
    setIsDisabled(bool);
  };
  const [postText, setPostText] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [link, setLink] = useState('');

  const [category, setCategory] = useState('Select a category');
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const categories = ["Advice", "Emotional Support", "Introduction", "Question", "Rant/Vent", "Self Improvement"];

  const [title, setTitle] = useState('');
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [bgColor, setBgColor] = useState('#E6CA85');
  const handleBgColorChange = (color) => {
    setBgColor(color);
  };
  const colorList=['#E6CA85', '#F2B880', '#90D7C9', '#EEE8AB', '#F4B2B2','#D1B2F7']

  const [board, setBoard] = useState('Select a board');
  const handleBoardChange = (event) => {
    setBoard(event.target.value);
  };

  const handlePostSubmit = () => {
    const post = {
      type: tab,
      title,
      category,
      author: "Anonymous",
      bgColor,
      board: board.split(',')[0],
      boardName: board.split(',')[1],
      optOutGen: optOutOfGeneral
      };
    if (tab === 'text') {
      post.content = postText;
    } else if (tab === 'image') {
      post.content = imageLink;
    } else if (tab === 'link') {
      post.content = link;
    } else if (tab === 'poll') {
      alert('Not implemented yet');
      return;
    }
    if (post.content === ""|| post.category === 'Select a category' || post.title === '' || post.bgColor === '' || post.board === 'Select a board') {
      alert('Please fill out all fields');
      return;
    }

    if (post.content.length > 4000 || post.title.length > 100) {
      alert('Title must be less than 100 characters and content must be less than 4000 characters');
      return;
    }
    handleDisable(true);
    setFeedback('Creating post...');
    fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedback(data.message);
        handleDisable(false);
        setPostText('');
        setImageLink('');
        setLink('');
        setCategory('Select a category');
        setTitle('');
        setBgColor('#E6CA85');
        setBoard('Select a board');
        setOptOutOfGeneral(false);
      })
      .catch((err) => {
        setFeedback('Error creating post');
        handleDisable(false);
      });
  }

  const [optOutOfGeneral, setOptOutOfGeneral] = useState(false);
  const handleOptOutOfGeneral = () => {
    setOptOutOfGeneral(!optOutOfGeneral);
  }
  return (
    <div className="create-post-container">
      <h2 className="create-post-title">Create a Post</h2>
      <input type="text" className="create-post-input" placeholder="Title" onChange={handleTitleChange} value={title}/>
      <Tabs tab={tab} handleTabChange={handleTabChange} />
      <TabContent tab={tab} setPostText={setPostText} postText={postText} setImageLink={setImageLink} imageLink={imageLink} setLink={setLink} link={link} />
      <div>
        <div>
          <select className="create-post-input" value={category} onChange={handleCategoryChange}>
            <option disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <BoardSelect board={board} handleBoardChange={handleBoardChange}/>
      </div>
      <ColorPalette colorList={colorList} bgColor={bgColor} handleBgColorChange={handleBgColorChange} includeBtn={true}/>
      <label>
      <input
        type="checkbox"
        checked={optOutOfGeneral}
        onChange={() => {
          handleOptOutOfGeneral()
        }}
      />
      {' Opt post out of general'}
    </label>

      <button
        onClick={handlePostSubmit}
        className={`create-post-button ${isDisabled ? 'disabled' : ''}`}
        disabled={isDisabled}
      >
        Create
      </button>
      <span>{feedback}</span>
    </div>

  );
};

export default CreatePost;