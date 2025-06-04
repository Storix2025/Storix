import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import "./style.css";

export default function SysadminNavBar() {
  return (
    <div className="sysadmin-nav-bar">
      <div className="sysadmin-nav-bar-logo">
        <Logo />
      </div>
      <div className="sysadmin-nav-bar-links">
        <NavLink
          to={"/sysadmin-layout/companies"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>Компании</p>
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
