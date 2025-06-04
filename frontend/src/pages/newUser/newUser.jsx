import { useState } from "react";
import "./newUser.css";
import axiosClient from "../../api/axiosClient";

const NewUser = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "worker",
    sysadmin: null,
    warehouse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const users = await axiosClient.get(`/users/`, formData);
    console.log("Ответ от сервера:", users);



    const response = await axiosClient.post(`/users/`, formData);
    alert("Пользователь успешно создан!");
    console.log("Ответ от сервера:", response.data);
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

          <input
            className="inputTitle"
            type="text"
            name="warehouse"
            placeholder="Введите номер склада"
            value={formData.warehouse}
            onChange={handleChange}
            required
          />

          <button type="submit">Создать аккаунт</button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
