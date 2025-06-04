import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logoIcon from "../../assets/image/logo-icon.png";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/appSlice";
import axiosClient from "../../api/axiosClient";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setMessage("Введите имя пользователя и пароль.");
      return;
    }
    console.log("Запрос отправлен");

    try {
      const response = await axiosClient.post("/token/", formData);
      const token = response.data;

      localStorage.setItem("token", token.access);
      localStorage.setItem("refresh_token", token.refresh);

      const userData = await axiosClient.get("/users/");
      const userDataJson = userData.data;
      const user = userDataJson.find((el) => el.username === formData.username);

      if (user) {
        dispatch(setUser(user));
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        if (user.role === "worker") {
          navigate("/worker-layout/inventarization");
        } else if (user.role === "admin") {
          navigate("/admin-layout/workers");
        } else {
          navigate("/sysadmin-layout/companies");
        }
        setMessage("Успешный вход!");
      } else {
        setMessage("Ошибка входа.");
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
      setMessage("Ошибка соединения с сервером.");
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
            <div
              className={`${styles.loginMessage} ${
                message.includes("успеш")
                  ? styles.loginSuccess
                  : styles.loginError
              }`}
            >
              {message}
            </div>
          )}
          <input
            className={styles.inputTitle}
            type="text"
            name="username"
            placeholder="Логин"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className={styles.inputTitle}
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className={styles.buttonTitle} type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
