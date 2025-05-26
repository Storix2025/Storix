import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import "./style.css";

export default function NavBar() {
  // const token = localStorage.getItem("token");

  return (
    <div className="navBar">
        <div className="navBar-logo">

      <Logo />
        </div>
      <div className="navBar-links">
        <NavLink
          to={"/layout/inventarization"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>Инвентаризация</p>
        </NavLink>
        <NavLink
          to={"/layout/store-history"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>История проверок</p>
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <p>На вход</p>
        </NavLink>
      </div>
    </div>
  );
}
