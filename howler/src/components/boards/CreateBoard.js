import { Modal, Button, Form } from 'react-bootstrap';
import './BoardList.css';
import React, { useState } from 'react';
function CreateBoard(props) {
    const handleClose = props.handleClose;
    const show = props.show;

    const [feedback , changeFeedback] = useState('');
    const [boardName, changeBoardName] = useState('');
    const handleNameInput = (event) => {
      const lastLetter = event.target.value[event.target.value.length - 1];
      if (lastLetter === ',' || lastLetter === ' ') {
        changeFeedback('No spaces or commas allowed');
        setTimeout(() => {
          changeFeedback('');
        }, 2000);
        return;
      }
        changeBoardName(event.target.value);
    }
    const [boardDescription, changeBoardDescription] = useState('');
    const handleDescriptionInput = (event) => {
        changeBoardDescription(event.target.value);
    }

    const handleSubmit = () => {
        fetch('/api/boards/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: boardName,
                description: boardDescription
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                handleClose();
                props.setRefresh(!props.refresh);
            } else {
                alert(data.message);
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Board Name</Form.Label>
            <Form.Control type="text" placeholder="Enter board name" value={boardName} onChange={handleNameInput}/>
          </Form.Group>
          <Form.Group className='margin-top'>
            <Form.Label>Board Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Describe your board" onChange={handleDescriptionInput} value={boardDescription}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
      <div className='center-div'>
        {feedback}
      </div>
    </Modal>
  );
}

export default CreateBoard