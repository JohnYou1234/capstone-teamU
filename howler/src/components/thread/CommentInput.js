import React, { useState } from 'react';
import './CommentInput.css';
import ColorPalette from '../create/ColorPalette';
function CommentInput(props) {
    const [commentInput, setCommentInput] = useState("");
    const disabled = commentInput.length === 0;
    const [feedback, setFeedback] = useState('');
    const [bgColor, setBgColor] = useState('white');
    const handleBgColorChange = (color) => {
      setBgColor(color);
    };
    const colorList=['white', '#E6CA85', '#F2B880', '#90D7C9', '#EEE8AB', '#F4B2B2','#D1B2F7']
    const handleChange = (e) => {
        setCommentInput(e.target.value);
    }
    const postId = props.postId;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentInput.length === 0) {
            alert("Please enter a comment")        
            return;
        }
        console.log(bgColor);
        fetch(`/api/comments/create/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: commentInput,
                bgColor: bgColor,
                post: postId
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCommentInput("");
            setFeedback(data.message);
            handleBgColorChange('white');
            setTimeout(() => {
                setFeedback('');
            }
            , 2000);
            props.setRefresh(!props.refresh);
        })
        .catch(err => console.log(err))
    }    
    return (
        <div className="create-comment">
            <form onSubmit={handleSubmit}>
                <textarea
                style={{backgroundColor: bgColor}}
                name="comment"
                id="comment"
                placeholder="Any thoughts or comments?"
                value={commentInput}
                onChange={handleChange}
                className="create-comment-input"
                ></textarea>
                <div className='center'>
                    <ColorPalette colorList={colorList} bgColor={bgColor} handleBgColorChange={handleBgColorChange}/>
                </div>
                <button type="submit" className="create-comment-button" disabled={disabled}>Submit</button>
            </form>
            <div className='center'>
                <p>{feedback}</p>
            </div>
        </div>
    )
}

export default CommentInput;