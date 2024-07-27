import React, { useState } from 'react';
import axios from 'axios';
import '../Login/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:2000/signup', { name, password });
      if (res.data.user) {
        alert("Success");
        localStorage.setItem('user', res.data.user._id);
        navigate('/home');
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="input-field">
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          name="name" 
        />
      </div>
      <div className="input-field">
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          name="password" 
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button className="submit" onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;