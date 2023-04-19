import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './AuthModal.css';
import AuthContext from '../../AuthContext';

function Login({ handleSwitch }, props) {
  const [netId, setNetId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { setIsLoggedIn, setUserId, setShowAuthModal } = useContext(AuthContext);
  const [feedback, setFeedback] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = netId + '@uw.edu';
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (res.status === 400) {
          const data = await res.json();
          throw new Error(data.message)
        }
        if (res.status !== 200) {
          throw new Error('Error logging in');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setIsLoggedIn(true);
          setUserId(data.userId);
          setShowAuthModal(false);
        } else {
          throw new Error(data.message)
        }
      })
      .catch((err) => {
        console.log(err);
        setFeedback(err.message);
      });
  };

  return (
    <>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className='m-bottom'>
            <Form.Label>UW Net ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter id"
              value={netId}
              onChange={(e) => setNetId(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className='m-bottom'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox" className='m-bottom'>
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </Form.Group>

        <div className='center m-bottom'>
            <Button variant="primary" type="submit" className="auth-modal-button">
                Login
            </Button>
        </div>
        {feedback && <div className='center m-bottom'>
            <p className='error'>{feedback}</p>
        </div>}
        </Form>
        <div className='vert-center'>
            <div className="login-modal-forgot-password">
            <a href="#">Forgot your password?</a>
            </div>

            <div className="login-modal-sign-up">
            Don't have an account? <a className='false-link' onClick={handleSwitch}>Sign up</a>
            </div>
        </div>
      </Modal.Body>
    </>
  );
}

export default Login;
