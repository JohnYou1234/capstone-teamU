import React, { useState, useContext } from 'react';
import './create.css';
import Tabs from './Tabs';
import TabContent from './TabContent';
import ColorPalette from './ColorPalette';
import BoardSelect from './BoardSelect';
import AuthContext from '../../AuthContext';

function CreatePost() {
  const { isLoggedIn, userId } = useContext(AuthContext);
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

  const [board, setBoard] = useState('');
  const handleBoardChange = (event) => {
    setBoard(event.target.value);
  };

  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const handlePostSubmit = () => {
    let boardName;
    let boardId;
    if (board === "") {
      boardName="General";
    } else {
      boardId = board.split(',')[0];
      boardName = board.split(',')[1];
    }
    if (board === "" && optOutOfGeneral === true) {
      alert('Cannot opt out of general and post in general!')
      return;
    }
    const post = {
      type: tab,
      title,
      category,
      author: userId,
      bgColor,
      board: boardId,
      boardName,
      optOutGen: optOutOfGeneral
      };
    if (tab === 'text') {
      post.content = postText;
    } else if (tab === 'image') {
      post.content = imageLink;
    } else if (tab === 'link') {
      post.content = link;
    } else if (tab === 'poll') {
      post.content = "poll";
    }
    if (post.content === ""|| post.category === 'Select a category' || post.title === '' || post.bgColor === '') {
      alert('Please fill out all fields');
      return;
    }

    if (tab === 'poll' && (pollQuestion === '' || pollOptions.includes(''))) {
      alert('Please fill out all fields');
      return;
    }

    if (post.content.length > 4000 || post.title.length > 100) {
      alert('Title must be less than 100 characters and content must be less than 4000 characters');
      return;
    }
    handleDisable(true);
    setFeedback('Creating post...');
    if (tab !== 'poll') {
      fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((data) => {
          resetForm(data);
        })
        .catch((err) => {
          setFeedback('Error creating post');
          handleDisable(false);
        });
      } else {
        post.question = pollQuestion;
        post.options = pollOptions;
        fetch('/api/polls/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
          })
          .then((res) => res.json())
          .then(data => {
            resetForm(data);
          })
          .catch((err) => {
            setFeedback('Error creating poll');
            handleDisable(false);
          });
      }

  }
  function resetForm(data) {
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
  }
  const [optOutOfGeneral, setOptOutOfGeneral] = useState(false);
  const handleOptOutOfGeneral = () => {
    setOptOutOfGeneral(!optOutOfGeneral);
  }
  return (
    <div className="create-post-container">
      <h2 className="create-post-title">Create Your Howl</h2>
      <Tabs tab={tab} handleTabChange={handleTabChange} />
      <input type="text" className="create-post-input" placeholder="Title" onChange={handleTitleChange} value={title}/>
      <TabContent tab={tab} setPostText={setPostText} postText={postText} setImageLink={setImageLink} imageLink={imageLink} setLink={setLink} link={link} 
      pollQuestion={pollQuestion} pollOptions={pollOptions} setPollOptions={setPollOptions} setPollQuestion={setPollQuestion} />
      <div className='flex-row'>
        <div className='mr-2'>
          <select className="create-post-input" value={category} onChange={handleCategoryChange}>
            <option disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <BoardSelect board={board} handleBoardChange={handleBoardChange}/>
      </div>
      <label>
      <input
        type="checkbox"
        checked={optOutOfGeneral}
        className='mb'
        onChange={() => {
          handleOptOutOfGeneral()
        }}
      />
      {' Opt howl out of general'}
    </label>
      <ColorPalette colorList={colorList} bgColor={bgColor} handleBgColorChange={handleBgColorChange} includeBtn={true}/>

{      isLoggedIn ? <button
        onClick={handlePostSubmit}
        className={`create-post-button ${isDisabled ? 'disabled' : ''}`}
        disabled={isDisabled}
      >
        Howl
      </button>
      :
      <p>Must be logged in to create post!</p>}
      <span>{feedback}</span>
    </div>

  );
};

export default CreatePost;