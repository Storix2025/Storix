import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logoIcon from '../../assets/image/logo-icon.png';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setMessage('Введите имя пользователя и пароль.');
      return;
    }
    console.log('Запрос отправлен');
    try {
      const response = await fetch('https://storix.onrender.com/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setMessage('Успешный вход!');
        
        localStorage.setItem('token', data.access);
      
        navigate('/inventarization'); 
      } else {
        setMessage('Ошибка входа.');
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
      setMessage('Ошибка соединения с сервером.');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src={logoIcon} alt="Storix Logo" />
          <h1>Storix</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {message && (
            <div className={`${styles.loginMessage} ${message.includes('успеш') ? styles.loginSuccess : styles.loginError}`}>
              {message}
            </div>
          )}
          <input className={styles.inputTitle} type="text" name="username" placeholder="Логин" value={formData.username} onChange={handleChange} required />
          <input className={styles.inputTitle} type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
          <button className={styles.buttonTitle} type="submit">Войти</button>
        </form>
        <a href="#" className={styles.forgotPassword}>Забыли пароль?</a>
      </div>
    </div>
  );
}

export default Login;
