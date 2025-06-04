import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

import "./style.css";
import axiosClient from "../../api/axiosClient";

export default function UserPage() {
  const baseUrl = "https://backend-storix.store/api";

  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axiosClient
      .get(`/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });

  }, [id]);

  const handleDeleteUser = async () => {
    if (window.confirm("Вы уверены, что хотите удалить пользователя?")) {
      try {
        await fetch(`${baseUrl}/users/${id}/`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("id: ", id);
        alert("Пользователь удалён");
        navigate("/admin-layout/workers");
      } catch (error) {
        alert("Ошибка при удалении пользователя");
        console.error(error);
      }
    }
  };

  return (
    <div className="store-container__user-info">
      <div className="main-content-worker">
        <div style={{ padding: "40px" }}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {user && (
            <div className="users-container__worker" key={user.id}>
              <p><strong>Имя:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email ? user.email : "не указан" }</p>
            </div>
          )}
        </div>
      </div>
      <div className="deleteButton" onClick={handleDeleteUser}>
        Удалить рабочего
      </div>
    </div>
  );
}
