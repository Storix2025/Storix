import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import "./user.css"

export default function UserPage() {
  const baseUrl = "https://backend-storix.store/api";

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${baseUrl}/users/${id}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки пользователя");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="store-container">
      {/* <div className="sidebar">
        <div className="sidebar-logo">
          <Logo />
        </div> */}
        {/* {/* <nav className="sidebar-nav">
          <a href="#" className="sidebar-link">История проверок</a>
          <a href="#" className="sidebar-link active">Инвентаризация</a>
        </nav>
      </div> */}
      <NavBar />
      <div className="main-content-user">
        <header className="store-header">
          <p className="store-header-logo">Пользователи</p>
          <div className="store-header-user">
            <div className="store-header-sobLogo">Пользователь</div>
            <div className="circle">П</div>
          </div>
        </header>
    
        <div style={{ padding: "40px" }}>
          {loading && <p>Загрузка...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {user && (
            <div className="users-container" key={user.id}>
              <p><strong>Имя:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Роль:</strong> {user.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
