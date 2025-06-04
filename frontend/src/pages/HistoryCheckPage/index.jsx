import { useEffect, useState } from "react";
import Card from "../../components/Card";
import "./style.css";
import axiosClient from "../../api/axiosClient";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/reducers/appSlice";
import { Link } from "react-router-dom";

export default function HistoryCheckPage() {
  const [reports, setReports] = useState([]);
  const user = useSelector(getUser);
  const [linkToCheck, setLinkToCheck] = useState("");
  useEffect(() => {
    async function fetchReports() {
      const reportsOnServe = await axiosClient.get(`/inventory/reports/`);
      console.log("reportsOnServe", reportsOnServe);
      setReports(reportsOnServe.data.reverse());
      console.log("reportsOnServerJson", reportsOnServe.data);

      if (user) {
        setLinkToCheck(user.role == "worker" ? "worker-layout" : "admin-layout");
      }
    }
    fetchReports();
  }, [user]);

  function formatDate(dateString) {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  }

  return (
    <div className="history-check-page">
      <div className="history-check-page__cards">
        {reports.map((report, index) => (
          <Link
            to={`/${linkToCheck}/history-check/${report.id}/`}
            key={index}
            style={{ 
              textDecoration: "none",
              color: "inherit",
              display: "inline-block",
              width: "fit-content" 
            }}
          >
            <Card
              key={index}
              subtitle={formatDate(report.created_at)}
              title={report.report_date}
              status={report.status}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
