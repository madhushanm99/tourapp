import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './SignupPage.css'; // Import your CSS file for styling
import AlertModal from './AlertModal';

function SignupPage() {
  // State variables to hold user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', { email, password, confirmPassword });
      if (response.status === 201) {
        setAlertMessage(response.data.message);
        setShowAlert(true);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setAlertMessage('Error: ' + response.data.error);
        setShowAlert(true);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Error response from server:', error.response.data);
        setAlertMessage('Error: ' + error.response.data.error); // Set error message from the backend response
        setShowAlert(true);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setAlertMessage('Error: No response received from server');
        setShowAlert(true);
      } else {
        // Something else happened in making the request that triggered an error
        console.error('Request failed:', error.message);
        setAlertMessage('Error: ' + error.message); // Set a generic error message for other errors
        setShowAlert(true);
      }
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button className="signup-btn" type="submit">Sign Up</button> </div>
        </form>
      </div>
      {showAlert && <AlertModal message={alertMessage} onClose={closeAlert} />}
    </div>
  );
}

export default SignupPage;
