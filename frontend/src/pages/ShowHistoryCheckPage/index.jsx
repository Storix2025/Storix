import { useState, useEffect } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/reducers/appSlice";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function InventariztionPage() {
  const { id } = useParams();
  const baseUrl = "https://backend-storix.store/api";

  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [resultPairs, setResultPairs] = useState([]);

  const renderStatusRow = (pair) => {
    const status = pair.current_location === pair.rack ? "OK" : "Расхождение";
    return (
      <tr key={pair.box}>
        <td>{pair.box}</td>
        <td>{pair.current_location || "-"}</td>
        <td>{pair.rack}</td>
        <td>
          <div className="status-wrapper">
            <span className={`status-${status === "OK" ? "ok" : "error"}`}>
              {status}
            </span>
          </div>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${baseUrl}/inventory/reports/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Ошибка сети");
        return response.json();
      })
      .then((created) => {
        console.log("Инвентаризация получена:", created);
        setResultPairs(created.result.пары);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
      });
  }, []);

  const handleDeleteCheck = async () => {
    if (window.confirm("Вы уверены, что хотите удалить запись?")) {
      try {
        const response = await axiosClient.delete(`/inventory/reports/${id}/`);
        console.log("Удалено:", response.data);
        navigate(`/admin-layout/history-check/`);
      } catch (error) {
        console.error("Ошибка удаления:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="invenariaztion-page">
     <div className="modal-backdrop">
        <div className="modal">
          <h2>Результаты инвентаризации</h2>
          <table>
            <thead>
              <tr>
                <th>ID товара</th>
                <th>Текущее местоположение</th>
                <th>Ожидаемое местоположение</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>{resultPairs.map(renderStatusRow)}</tbody>
          </table>
        </div>
      </div>

      {user?.role === "admin" && (
        <div className="deleteButton" onClick={handleDeleteCheck}>
          Удалить результат
        </div>
      )}
    </div>


  );
}
