import React, { useState } from 'react';
import "./newUser.css";

const NewUser = () => {
  const baseUrl = "https://backend-storix.store/api";

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    sysadmin: 0,
    warehouse: 0,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/users/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании пользователя');
      }

      const data = await response.json();
      alert('Пользователь успешно создан!');
      console.log('Ответ от сервера:', data);
    } catch (error) {
      console.error('Ошибка:', error.message);
      alert('Не удалось создать пользователя.');
    }
  };

  return (
    <div className="background">
      <div className="loginBox">
        <form onSubmit={handleSubmit}>
          <h2>Регистрация нового пользователя</h2>

          
          <input
            className="inputTitle"
            type="text"
            name="username"
            placeholder="Введите имя"
            value={formData.username}
            onChange={handleChange}
            required
          />

          
          <input
            className="inputTitle"
            type="email"
            name="email"
            placeholder="Введите почту"
            value={formData.email}
            onChange={handleChange}
            required
          />

          
          <input
            className="inputTitle"
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />

         
          <select
            className="inputTitle"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Выберите роль</option>
            <option value="user">Пользователь</option>
            <option value="sysadmin">Администратор</option>
          </select>

          <button type="submit">Создать аккаунт</button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
