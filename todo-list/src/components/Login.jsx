import { useState } from 'react';
import { loginUser } from '../services/api';
import '../styles/Login.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email);
      if (response.data && response.data.token) {
        const token = response.data.token.trim();
        localStorage.setItem('token', token);
        console.log('Token guardado:', token);
        localStorage.setItem('userEmail', email);
        onLoginSuccess(email);
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intente nuevamente.');
      console.error('Error detallado:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 