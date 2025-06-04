import { useState } from "react";
import "./style.css";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const NewUser = () => {

  const { id: warehouseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "worker",
    sysadmin: null,
    warehouse: warehouseId,
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

    navigate(`/admin-layout/warehouses/${warehouseId}`);
  };

  return (
    <div className="background__newWorker">
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

          <button type="submit">Создать аккаунт</button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
