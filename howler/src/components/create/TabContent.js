import React from 'react';
import './create.css';
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

    const link = props.link;
    const setLink = props.setLink;
    const handleLinkChange = (event) => {
        setLink(event.target.value);
      };
    switch (tab) {
        case 'text':
          return (
            <textarea onInput={handlePostChange} className="create-post-input" placeholder="Text" value={postText} />
          );
        case 'image':
          return (
            <input onChange={handleImageLinkChange} type="text" className="create-post-input" placeholder="IMGUR LINK" value={imageLink}/>
          );
        case 'link':
          return (
            <input onChange={handleLinkChange} type="text" className="create-post-input" placeholder="Link URL" value={link} />
          );
        case 'poll':
          return (
              <p>Not implemented yet</p>
          )
        default:
          return null;
      }
}

export default TabContent;