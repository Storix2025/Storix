import { useEffect, useState } from "react";
import "./style.css";
import axiosClient from "../../api/axiosClient";
import { getUser } from "../../redux/reducers/appSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin",
    warehouse: null,
    sysadmin: ""
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({...prev, sysadmin: user.id}));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(`/users/`, formData);
      alert("Аккаунт компании успешно создан!");
      console.log("Ответ от сервера:", response.data);
      
      navigate(`/sysadmin-layout/companies/`);
    } catch (error) {
      console.error("Ошибка:", error.response?.status, error.response?.data);
      alert("Не удалось создать пользователя.");
    }
    console.log(user);
    console.log("Данные компании", formData);
  };

  return (
    <div className="background">
      <div className="loginBox">
        <form onSubmit={handleSubmit}>
          <h2>Регистрация новой компании</h2>

          <input
            className="inputTitle"
            type="text"
            name="username"
            placeholder="Введите название компании"
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
