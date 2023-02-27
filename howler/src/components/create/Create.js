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
          <input type="text" className="create-post-input" placeholder="Image URL" />
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

      <button className="create-post-button">Submit</button>
    </div>
  );
};

export default CreatePost;