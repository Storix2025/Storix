import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar"
import PlusButton from "../../components/PlusButton"
import "./usersList.css";

export default function Users() {
  const baseUrl = "https://backend-storix.store/api";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetRole = "worker";

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${baseUrl}/users/`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      
    }) 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(user => user.role === targetRole);

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
      <div className="main-content-users">
        <header className="store-header">
          <p className="store-header-logo">Пользователи</p>
          <div className="store-header-user">
            <div className="store-header-sobLogo">Пользователь</div>
            <div className="circle">П</div>
          </div>
        </header>

        <div className="users-list">
          {loading && <p>Загрузка...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && (
            filteredUsers.length > 0 ? (
              <ul>
                {filteredUsers.map((user) => (
                  
                  <div className="users-list">
                    <Link to={`/users/${user.id}`} key={user.id} style={{ textDecoration: "none", color: "inherit" }}>
                      <div className="users-container" key={user.id}>
                        <p><strong>Name:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
          
                      </div>
                    </Link>
                  </div>
                ))}
              </ul>
            ) : (
              <p>Нет пользователей с ролью: <strong>{targetRole}</strong></p>
            )
          )}
        </div>
           <PlusButton to="/newUser" />
      </div>

   
    </div>
  );
}