import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import "./style.css";


export default function AdminNavBar() {
  return (
    <div className="admin-nav-bar">
      <div className="admin-nav-bar-logo">
        <Logo />
      </div>
      <div className="admin-nav-bar-links">
        <NavLink
          to={"/admin-layout/history-check"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>История проверок</p>
        </NavLink>

        <NavLink
          to={"/admin-layout/workers"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>Сотрудники</p>
        </NavLink>
        <NavLink
          to={"/admin-layout/warehouses"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>Склады</p>
        </NavLink>

        <NavLink
          to={"/admin-layout/company-profile"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>Профиль компании</p>
        </NavLink>


        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>Выход</p>
        </NavLink>
      </div>
    </div>
  );
}
