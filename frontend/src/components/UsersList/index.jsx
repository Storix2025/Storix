import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import CardUser from "../CardUsers";
import "./usersList.css";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/reducers/appSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [linkToCheck, setLinkToCheck] = useState("");
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const location = useLocation();

  const targetRole = useMemo(() => {
    const path = location.pathname;
    if (path.includes("/sysadmin-layout")) return "admin";
    if (path.includes("/admin-layout")) return "worker";
    return null;
  }, [location.pathname]);

  const { id: warehouseId = ""  } = useParams();

  useEffect(() => {
    axiosClient
      .get(`/users/`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    if (user) {
      switch(user.role) {
        case "worker":
          setLinkToCheck("worker-layout");
          return;
        case "admin":
          setLinkToCheck("admin-layout/workers");
          return;
        case "sysadmin":
          setLinkToCheck("sysadmin-layout/companies");
          return;
      }
    }
  }, [user]);

  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    async function fetchWarehouses() {
      const response = await axiosClient.get("/warehouses/");
      console.log("response :>> ", response);
      setWarehouses(response.data);
    }
    fetchWarehouses();
  }, [user]);
    
  const handleDeleteWarehouse = async () => {
    if (window.confirm("Вы уверены, что хотите удалить склад?")) {
      async function fetchWarehouses() {
        const response = await axiosClient.delete(`/warehouses/${warehouseId}/`);
        console.log("response :>> ", response);
        navigate(`/admin-layout/warehouses/`);
      }
    
      fetchWarehouses();
    }
  };

  const getWarehouseName = async () => {
    async function fetchWarehouses() {
      const response = await axiosClient.get(`/warehouses/${warehouseId}/`);
      console.log("response :>> ", response);
      return response.name;
    }
  
    fetchWarehouses();
  };

  console.log(targetRole);
  const filteredUsers = users
    .filter((userInList) => userInList.role === targetRole)
    .filter((userInList) => warehouseId ? String(userInList.warehouse) === warehouseId : true)
    .filter((userInList) => {
      if (user.role !== "admin") return true;
      const warehouse = warehouses.find(w => w.id === userInList.warehouse);
      return warehouse?.admin === user.id;
    }) 
  ;

  return (
    <div className="users-list-page">
      <div className="users-list-page__list">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          (filteredUsers.length > 0 ? (
            <div className="users-list-page__grid">
              {filteredUsers.map((user) => (
                <Link
                  to={`/${linkToCheck}/${user.id}`}
                  key={user.id}
                  className="card-link"
                >
                  <CardUser
                    title="Пользователь"
                    name={user.username}
                    email={user.email || "не указан"}
                  />
                </Link>
              ))}
            </div>

          ) : (
            (user.role === "admin" ? (
              <p>
                У вас ещё нет рабочих.
              </p>
            ) : user.role === "sysadmin" ? (
              <p>
                Здесь ещё нет компаний.
              </p>
            ) : null)
          ))}
      </div>
      {warehouseId && (
        <div className="floating-buttons">
          <div className="deleteButton" onClick={handleDeleteWarehouse}>
            Удалить склад
          </div>
          <Link to={`/admin-layout/warehouses/${warehouseId}/newWorker`} >
            <div className="addButton addButtonWorker">
              Добавить рабочего
            </div>
          </Link>
        </div>
      )} 
      {user?.role === "sysadmin" && (
        <Link to={`/sysadmin-layout/companies/new`} >
          <div className="addButton addButtonCompany">
            Добавить компанию
          </div>
        </Link>
      )}
    </div>
  );
}
