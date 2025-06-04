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
    admin: ""
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({...prev, admin: user.id}));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axiosClient.post(`/warehouses/`, formData);
    alert("Склад успешно создан!");
    console.log("Ответ от сервера:", response.data);

    navigate(`/admin-layout/warehouses/`);
  };

  return (
    <div className="background__newWarehouse">
      <div className="loginBox">
        <form onSubmit={handleSubmit}>
          <h2>Создание нового склада</h2>

          <input
            className="inputTitle"
            type="text"
            name="name"
            placeholder="Введите название склада"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <button type="submit">Создать склад</button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
