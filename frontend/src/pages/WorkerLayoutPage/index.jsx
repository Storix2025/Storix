import { useEffect } from "react";
import NavBar from "../../components/WorkerNavBar";
import { Outlet } from "react-router-dom";
import "./style.css";
import User from "../../components/User";
import { setUser } from "../../redux/reducers/appSlice";
import { useDispatch } from "react-redux";
import axiosClient from "../../api/axiosClient";
export default function WorkerLayoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    dispatch(setUser(JSON.parse(user)));
    async function fetchReports() {
      const dashboard = await axiosClient.get(`/dashboard/worker`);

      console.log("dashboard", dashboard);
      const reportsOnServe = await axiosClient.get(`/warehouses/${1}/reports/`);
      console.log("reportsOnServe", reportsOnServe);
    }
    fetchReports();
  }, []);

  return (
    <div className="worker-layout">
      <NavBar />
      <div className="worker-layout__container">
        <User />
        <Outlet />
      </div>
    </div>
  );
}
