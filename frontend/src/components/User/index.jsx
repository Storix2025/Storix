import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./user.css";
import { getUser } from "../../redux/reducers/appSlice";
import { useSelector } from "react-redux";

export default function User() {
  const baseUrl = "https://backend-storix.store/api";

  const token = localStorage.getItem("token");

  const user = useSelector(getUser);
  const id = user?.id;

  const location = useLocation();
  const getHeaderText = () => {


    switch (location.pathname) {
      case "/worker-layout/inventarization":
        return "Инвентаризация";
      case "/worker-layout/history-check":
        return "История проверок";
      case "/admin-layout/workers":
        return "Сотрудники";
      case "/admin-layout/warehouses":
        return "Склады";
      case "/admin-layout/warehouses/new":
        return "Новый склад";
      case "/admin-layout/company-profile":
        return "Профиль компании";
      case "/sysadmin-layout/companies":
        return "Компании";
    } 

    if (
      location.pathname.startsWith("/worker-layout/history-check/") ||
      location.pathname.startsWith("/admin-layout/history-check/")
    ) {
      return "История проверки";
    } 

    else if (location.pathname.startsWith("/admin-layout/workers/")) {
      return "Сотрудник";
    } 

    else if (location.pathname.startsWith("/admin-layout/warehouses/")) {
      return "Склад";
    }

    else if (location.pathname.startsWith("/sysadmin-layout/companies/")) {
      return "Компания";
    }
    
  };

  useEffect(() => {

    fetch(`${baseUrl}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки пользователя");
        return res.json();
      })
  }, [id]);

  return (
    <div>
      <div className="store-header">
        <p className="store-header-logo">{getHeaderText()}</p>
        <div className="store-header-user">
          <div className="store-header-sobLogo">{user?.username}</div>
          <div className="circle">{user?.username[0]}</div>
        </div>
      </div>
    </div>
  );
}
