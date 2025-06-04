import { useEffect } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { Outlet } from "react-router-dom";
import "./style.css";
import User from "../../components/User";
import { setUser } from "../../redux/reducers/appSlice";
import { useDispatch } from "react-redux";

export default function AdminLayoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    dispatch(setUser(JSON.parse(user)));
    console.log("user", JSON.parse(user));

  }, []);

  return (
    <div className="admin-layout">
      <AdminNavBar />
      <div className="admin-layout__container">
        <User />
        <Outlet />
      </div>
    </div>
  );
}
