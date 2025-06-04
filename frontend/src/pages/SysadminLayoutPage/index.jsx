import { useEffect } from "react";
import SysadminNavBar from "../../components/SysadminNavBar";
import { Outlet } from "react-router-dom";
import "./style.css";
import User from "../../components/User";
import { setUser } from "../../redux/reducers/appSlice";
import { useDispatch } from "react-redux";
import axiosClient from "../../api/axiosClient";

export default function SysadminLayoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    dispatch(setUser(JSON.parse(user)));
    console.log("user", JSON.parse(user));

    async function getUsers() {
      const users = await axiosClient.get("/users/");
      console.log("users", users);
    }
    getUsers();
  }, []);

  return (
    <div className="sysadmin-layout">
      <SysadminNavBar />
      <div className="sysadmin-layout__container">
        <User />
        <Outlet />
      </div>
    </div>
  );
}
