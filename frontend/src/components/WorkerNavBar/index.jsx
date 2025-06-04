import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import "./style.css";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/reducers/appSlice";      

export default function NavBar() {
  const user = useSelector(getUser);
  console.log("user", user);
  return (
    <div className="navBar">
      <div className="navBar-logo">
        <Logo />
      </div>
      <div className="navBar-links">
        <NavLink
          to={"/worker-layout/inventarization"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>Инвентаризация</p>
        </NavLink>
        <NavLink
          to={"/worker-layout/history-check"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>История проверок</p>
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
