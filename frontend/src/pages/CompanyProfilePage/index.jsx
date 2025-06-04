import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/reducers/appSlice";
import "./style.css";
import axiosClient from "../../api/axiosClient";

export default function CompanyProfilePage() {
  const company = useSelector(getUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  useEffect(() => {
    if (success) {
      alert(success);
      setSuccess("");
    }
  }, [success]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password || !repeatPassword) {
      setError("Заполните оба поля пароля");
      return;
    }
    if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    const body = { password };

    try {
      const response = await axiosClient.patch(`/users/${company.id}/`, body);
      console.log(response);
      console.log(await axiosClient.get(`/users/${company.id}/`));
      setSuccess("Пароль успешно изменён");
      setModalOpen(false);
      setPassword("");
      setRepeatPassword("");
    } catch (err) {
      console.error("Ошибка:", err.response?.data || err.message);
      setError("Ошибка при изменении пароля");
    }
  };

  return (
    <div className="company-profile-page">
      <div className="main-content-worker">
        <div style={{ padding: "40px" }}>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {company && (
            <div className="users-container__worker" key={company.id}>
              <p><strong>Имя:</strong> {company.username}</p>
              <p><strong>Email:</strong> {company.email ? company.email : "не указан" }</p>
            </div>
          )}
        </div>
      </div>
      <button
        className="company-profile-page__company-info-button"
        onClick={() => setModalOpen(true)}
      >
        Изменить пароль
      </button>
      {modalOpen && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal"
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 32,
              minWidth: 320,
              minHeight: 200,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                fontSize: 24,
                cursor: "pointer",
              }}
              onClick={() => setModalOpen(false)}
            >
              &times;
            </span>
            <h2>Смена пароля</h2>
            <form onSubmit={handlePasswordChange}>
              <div style={{ marginBottom: 16 }}>
                <label>Новый пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 8,
                    marginTop: 4,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                  placeholder="Введите пароль"
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label>Повторите пароль</label>
                <input
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 8,
                    marginTop: 4,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                  placeholder="Повторите пароль"
                />
              </div>
              {error && (
                <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
              )}
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#349ef3",
                  color: "#fff",
                  padding: 12,
                  border: "none",
                  borderRadius: 8,
                  fontSize: 18,
                  cursor: "pointer",
                }}
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
