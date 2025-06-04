import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import Card from "../../components/Card";
import "./style.css";
import PlusButton from "../../components/PlusButton";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/reducers/appSlice";


export default function WarehousesListPage() {
  const user = useSelector(getUser);

  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    async function fetchWarehouses() {
      const response = await axiosClient.get("/warehouses/");
      console.log("response :>> ", response);
      setWarehouses(response.data);
    }
    fetchWarehouses();
  }, [user]);

  return (
    <div className="warehouses-list-page">
      {warehouses.map((warehouse) => (
        <Link
          to={`/admin-layout/warehouses/${warehouse.id}`}
          key={warehouse.id}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "block",
            width: "fit-content",
            margin: "50px auto",
          }}
        >
          <Card 
            key={warehouse.id} 
            title={warehouse?.name} 
            style={{ height: '100px' }} 
          />
        </Link>
      ))}

      <PlusButton to={`/admin-layout/warehouses/new`} />

    </div>
  );
}
