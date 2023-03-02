import React, { useState } from 'react';
import './create.css';
import Tabs from './Tabs';
import TabContent from './TabContent';
import ColorPalette from './ColorPalette';
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

  const [title, setTitle] = useState('');
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [bgColor, setBgColor] = useState('#E6CA85');
  const handleBgColorChange = (color) => {
    setBgColor(color);
  };
  const colorList=['#E6CA85', '#F2B880', '#90D7C9', '#EEE8AB', '#F4B2B2','#D1B2F7']
  const handlePostSubmit = () => {
    const post = {
      type: tab,
      title,
      category,
      author: "Anonymous",
      bgColor
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
    if (post.content === ""|| post.category === 'Select a category' || post.title === '') {
      alert('Please fill out all fields');
      return;
    }
    handleDisable(true);
    setFeedback('Creating post...');
    fetch('http://localhost:3080/api/posts/create', {
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
      })
      .catch((err) => {
        setFeedback('Error creating post');
        handleDisable(false);
      });
  }

  return (
    <div className="create-post-container">
      <h2 className="create-post-title">Create a Post</h2>
      <input type="text" className="create-post-input" placeholder="Title" onChange={handleTitleChange} value={title}/>

      <Tabs tab={tab} handleTabChange={handleTabChange} />
      <TabContent tab={tab} setPostText={setPostText} postText={postText} setImageLink={setImageLink} imageLink={imageLink} setLink={setLink} link={link} />
      <div>
        <select className="create-post-input" value={category} onChange={handleCategoryChange}>
          <option disabled>Select a category</option>
          <option value="advice">Advice</option>
          <option value="emotionalSupport">Emotional Support</option>
          <option value="introduction">Introduction</option>
          <option value="rantVent">Rant/Vent</option>
          <option value="selfImprovement">Self Improvement</option>
        </select>
      </div>
      <ColorPalette colorList={colorList} bgColor={bgColor} handleBgColorChange={handleBgColorChange} includeBtn={true}/>
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