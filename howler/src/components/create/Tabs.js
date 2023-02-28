import React from 'react';
import './create.css';
function Tabs(props) {
    const handleTabChange = props.handleTabChange;
    const tab = props.tab;
    return (
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
    )
}

export default Tabs;