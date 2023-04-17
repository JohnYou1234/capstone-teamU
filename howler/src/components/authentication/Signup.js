import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './AuthModal.css';

function Signup({ handleSwitch }) {
    const [netId, setNetId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const handleSignupSubmit = async (e) => {
      e.preventDefault();
      if (validateFields()) {
          setIsVerifying(true);
          const email = netId + '@uw.edu';
          try {
              const response = await fetch('/api/users/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({email, password })
              });

              if (response.status !== 200) {
                  throw new Error('Error registering user');
              }
          } catch (error) {
              console.error(error);
              setIsVerifying(false);
          }
      }
  };

  const createAccountHandler = async (e) => {
      e.preventDefault();
      const email = netId + '@uw.edu';
      try {
          const response = await fetch('/api/users/verify', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, code: verificationCode })
          });
          if (response.status === 400) {
              const data = await response.json();
              throw new Error(data.message)
          }
          if (response.status !== 200) {
              throw new Error('Error verifying user');
          }
          setIsVerifying(false);
          handleSwitch(); 

      } catch (error) {
          console.error(error);
      }
  };
    const handleEmailChange = (e) => {
      setNetId(e.target.value)
      };
      
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const handleVerificationCode = (e) => {
        setVerificationCode(e.target.value);
    };  

    const validateFields = () => {
        const newErrors = {};

        if (netId.length > 20) {
          newErrors.netId = "NetID must be 20 characters or less";
        }

        if (netId.length < 3) {
            newErrors.netId = "NetID must be at least 3 characters";
        }

        if (password.length < 7 || password.length > 15) {
          newErrors.password = "Password must be between 7 and 15 characters";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
      
      
  return (
    <>
      {!isVerifying ? 
      <Modal.Body>
        <Form onSubmit={handleSignupSubmit}>
        <Form.Group controlId="formBasicEmail" className="m-bottom">
            <Form.Label>Enter your UW NetID</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter UW NetID"
                value={netId}
                onChange={handleEmailChange}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="m-bottom">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
        </Form.Group>


          <Form.Group controlId="formBasicConfirmPassword" className='m-bottom'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
          </Form.Group>

          <div className='center m-bottom'>
            <Button variant="primary" type="submit" className="auth-modal-button">
              Signup
            </Button>
          </div>

        </Form>
        <div className='vert-center'>
          <div className="auth-modal-switch">
            Already have an account? <a onClick={handleSwitch}>Login</a>
          </div>
        </div>
      </Modal.Body>
        : 
        <Modal.Body>
            <Form onSubmit={createAccountHandler}>
                <Form.Group controlId="verificationCode" className='m-bottom'>
                    <h3>Verify your student status</h3>
                    <Form.Label>Enter the code we gave you</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter code"
                    value={verificationCode}
                    maxLength={8}
                    onChange={(e) => handleVerificationCode(e)}
                    />
                </Form.Group>
                <div className='center m-bottom'>
                    <Button variant="primary" type="submit" className="auth-modal-button">
                        Create Account
                    </Button>
                </div>

            </Form>
        </Modal.Body>
        }
    </>
  );
}

export default Signup;
