import { useEffect, useRef, useState } from 'react';
import '../styles/variables.css';
import '../styles/globals.css';
import '../styles/darkmode.css';

export default function SignupPage() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    contact: '',
    password: '',
    username: ''
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2,
      dx: Math.random() * 0.5,
      dy: Math.random() * 0.5,
    }));

    function animateStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        if (star.x > canvas.width) star.x = 0;
        if (star.y > canvas.height) star.y = 0;
      }
      requestAnimationFrame(animateStars);
    }
    animateStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const toggleMode = () => setMode(mode === 'login' ? 'register' : 'login');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = mode === 'login' ? '/api/login' : '/api/register';
    const body = {
      contact: formData.contact,
      password: formData.password,
      ...(mode === 'register' && { username: formData.username })
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      alert(data.message || data.error || 'Something went wrong');
    } catch {
      alert('Error connecting to the server');
    }
  };

  return (
    <div>
      <h1 className="slogan">
        Welcome to Yumi, the platform where everything is possible.
      </h1>

      <form id="authForm" onSubmit={handleSubmit}>
        <h2 id="formTitle">{mode === 'login' ? 'Login' : 'Registration'}</h2>

        <input
          type="text"
          name="contact"
          placeholder="Email or phone number"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {mode === 'register' && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="usernameInput"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <div className="form-buttons">
          <button type="submit" id="submitBtn">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
          <button
            type="button"
            id="cancelBtn"
            onClick={() => {
              setFormData({ contact: '', password: '', username: '' });
              if (mode === 'register') toggleMode();
            }}
          >
            Cancel
          </button>
        </div>

        <p id="toggleForm">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
            {mode === 'login' ? 'Register' : 'Log in'}
          </a>
        </p>
      </form>

      <div className="background-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>

      <canvas id="stars" ref={canvasRef}></canvas>
    </div>
  );
}