import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './AuthModal.css';
import Login from './Login';
import Signup from './Signup';

function AuthModal(props) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login' : 'Sign Up'}</Modal.Title>
      </Modal.Header>
      {isLogin ? (
        <Login handleSwitch={() => setIsLogin(false)} />
      ) : (
        <Signup handleSwitch={() => setIsLogin(true)} />
      )}
    </Modal>
  );
}

export default AuthModal;
