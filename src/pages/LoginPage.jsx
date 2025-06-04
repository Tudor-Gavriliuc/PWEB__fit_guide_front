import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';



export default function LoginPage({ toggleBackground, bgMode, toggleShowAddExercise }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login', form);
      console.log(res.data)
      localStorage.setItem('token', res.data.access_token);
      setMessage('Logged in successfully');
    } catch (err) {
      setMessage(err.message);
    }
  };

return (
  <>
    <Navbar toggleBackground={toggleBackground} bgMode={bgMode} />
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '1rem' }}>
        <h2 className="mb-4 text-center">Login</h2>
        {message && <p className="text-center text-danger">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  </>
);
}