import React, { useState } from 'react';
import './create.css';

function CreatePost() {
  const [tab, setTab] = useState('text');
  const handleTabChange = (tab) => {
    setTab(tab);
  };
  const renderTabContent = () => {
    switch (tab) {
      case 'text':
        return (
          <textarea className="create-post-input" placeholder="Text" />
        );
      case 'image':
        return (
          <input type="text" className="create-post-input" placeholder="IMGUR LINK" />
        );
      case 'link':
        return (
          <input type="text" className="create-post-input" placeholder="Link URL" />
        );
      case 'poll':
        return (
            <p>Not implemented yet</p>
        )
      default:
        return null;
    }
  };

  const [category, setCategory] = useState('Select a category');
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div className="create-post-container">
      <h2 className="create-post-title">Create a Post</h2>
      <input type="text" className="create-post-input" placeholder="Title" />

      <div className="create-post-tabs">
        <button
          className={`create-post-tab ${tab === 'text' ? 'active' : ''}`}
          onClick={() => handleTabChange('text')}
        >
          Text
        </button>
        <button
          className={`create-post-tab ${tab === 'image' ? 'active' : ''}`}
          onClick={() => handleTabChange('image')}
        >
          Image
        </button>
        <button
          className={`create-post-tab ${tab === 'link' ? 'active' : ''}`}
          onClick={() => handleTabChange('link')}
        >
          Link
        </button>
        <button
          className={`create-post-tab ${tab === 'poll' ? 'active' : ''}`}
          onClick={() => handleTabChange('poll')}
        >
          Poll
        </button>
      </div>

      {renderTabContent()}
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
      <input type="text" className="authorInput" placeholder="Author" />

      <button className="create-post-button">Submit</button>
    </div>
  );
};

export default CreatePost;