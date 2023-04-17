import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CategoryButtons from './CategoryButtons';
import './CreateReport.css';

function CreateReport({ show, handleClose, dataId, isPost }) {
  const [selected, setSelected] = useState(-1);
  const [reportText, setReportText] = useState('');
  const [feedback, setFeedback] = useState('');
  const handleReportSubmit = (e) => {
    e.preventDefault();
    setFeedback('Your report has been submitted, thank you!');
    setTimeout(() => {
      setFeedback('')
      handleClose();
    }, 3000);
  };

  return (
    <Modal centered show={show} onHide={handleClose} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>Submit a Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategoryButtons selected={selected} setSelected={setSelected} />
          {selected !== -1 && <Form onSubmit={handleReportSubmit}>
            <Form.Group controlId="reportText">
              <Form.Label>Additional Context or Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter any additional context or details about the report here"
                value={reportText}
                onChange={(e) => {
                  if (e.target.value.length > 500) {
                    setFeedback('Report text cannot exceed 500 characters');
                    setTimeout(() => setFeedback(''), 3000);
                    return;
                  }
                  setReportText(e.target.value);
                }}
              />
            </Form.Group>
            <div className="center-col">
              <p className='error'>{feedback}</p>
              <Button className='reportBtn' variant="primary" type="submit">
                Submit Report
              </Button>
            </div>
          </Form>}
      </Modal.Body>
    </Modal>
  );
}

export default CreateReport;
