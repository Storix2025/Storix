import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import axiosClient from "../../api/axiosClient";


export default function UserPage() {
  const baseUrl = "https://backend-storix.store/api";

  const { id } = useParams();


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
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

  const handleDeleteUser = async () => {
    if (window.confirm("Вы уверены, что хотите удалить компанию")) {
    
      try {
        await axiosClient.delete(`/users/${id}/`);
        
        console.log("id: ", id);
        alert("Компания удалён");
        
        navigate("/sysadmin-layout/companies");
      } catch (error) {
        alert("Ошибка при удалении компании");
        console.error(error);
      }
    }
  };

  return (
    <div className="store-container__user-info">
      <div className="main-content-user">
        <div style={{ padding: "40px" }}>
          {loading && <p>Загрузка...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {user && (
            <div className="users-container__worker" key={user.id}>
              <p><strong>Название:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email ? user.email : "не указан" }</p>
            </div>
          )}
        </div>
      </div>
    
      <div className="deleteButton" onClick={handleDeleteUser}>
        Удалить компанию
      </div>
    </div>
  );
}
