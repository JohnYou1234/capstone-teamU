import React from 'react';
import './create.css';
import CreatePoll from './CreatePoll';
function TabContent(props) {
    const tab = props.tab;
    const setImageLink = props.setImageLink;
    const imageLink = props.imageLink;
    const handleImageLinkChange = (event) => {
        setImageLink(event.target.value);
    };

    const setPostText = props.setPostText;
    const postText = props.postText;
    const handlePostChange = (event) => {
        setPostText(event.target.value);
    };

    const pollOptions = props.pollOptions;
    const setPollOptions = props.setPollOptions;
    const pollQuestion = props.pollQuestion;
    const setPollQuestion = props.setPollQuestion;
    

    switch (tab) {
        case 'text':
          return (
            <textarea onInput={handlePostChange} className="create-post-input" placeholder="Text" value={postText} />
          );
        case 'image':
          return (
            <>
                <input onChange={handleImageLinkChange} type="text" className="create-post-input" placeholder="IMGUR LINK" value={imageLink}/>
            </>
          );
        case 'poll':
          return (
              <CreatePoll pollOptions={pollOptions} setPollOptions={setPollOptions} pollQuestion={pollQuestion} setPollQuestion={setPollQuestion} />
          )
        default:
          return null;
      }
}

export default TabContent;