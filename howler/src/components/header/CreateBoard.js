import { Modal, Button, Form } from 'react-bootstrap';
import './BoardList.css';
function CreateBoard(props) {
    const handleClose = props.handleClose;
    const show = props.show;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Board Name</Form.Label>
            <Form.Control type="text" placeholder="Enter board name" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => console.log('hello world')}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateBoard