import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserInfo from "./pages/UserInfo";
import CompanyInfo from "./pages/CompanyInfo";
import AdminLayoutPage from "./pages/AdminLayoutPage";
import WorkerHistoryCheckPage from "./pages/HistoryCheckPage";
import Home from "./pages/home/Home";
import InventarizationPage from "./pages/InventariztionPage";
import Login from "./pages/login/Login";
import NewUser from "./pages/newUser/newUser";
import Pricing from "./pages/pricing/Pricing";
import WorkerLayout from "./pages/WorkerLayoutPage";
import WorkersListPage from "./pages/WorkersListPage";
import CompanyListPage from "./pages/CompanyListPage";
import UsersList from "./components/UsersList";
import WarehousesListPage from "./pages/WarehousesListPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import SysadminLayoutPage from "./pages/SysadminLayoutPage";
import SysadminProfilePage from "./pages/SysadminProfilePage";

import ShowHistoryCheckPage from "./pages/ShowHistoryCheckPage";
import NewWorker from "./pages/NewWorker";
import NewWarehouse from "./pages/NewWarehouse";
import NewCompany from "./pages/NewCompany";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/worker-layout" element={<WorkerLayout />}>
            <Route path="history-check" element={<WorkerHistoryCheckPage />} />
            <Route path="history-check/:id" element={<ShowHistoryCheckPage />} />
            <Route path="inventarization" element={<InventarizationPage />} />
          </Route>

          <Route path="/admin-layout" element={<AdminLayoutPage />}>
            <Route path="history-check" element={<WorkerHistoryCheckPage />} />
            <Route path="history-check/:id" element={<ShowHistoryCheckPage />} />
            <Route path="workers" element={<WorkersListPage />} />
            <Route path="warehouses" element={<WarehousesListPage />} />
            <Route path="warehouses/new" element={<NewWarehouse />} />
            <Route path="warehouses/:id" element={<WorkersListPage />} />
            <Route path="warehouses/:id/newWorker" element={<NewWorker />} />
            <Route path="company-profile" element={<CompanyProfilePage />} />
            <Route path="workers/:id" element={<UserInfo />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route path="/users" element={<UsersList />} />
          <Route path="/newUser" element={<NewUser />} />
          {/* <Route path="/users/:id" element={<User />} /> */}

          <Route path="/sysadmin-layout" element={<SysadminLayoutPage />}>
            <Route path="companies" element={<CompanyListPage />} />
            <Route path="companies/:id" element={<CompanyInfo />} />
            {/* <Route path="company-profile" element={<SysadminProfilePage />} /> */}
            <Route path="companies/new" element={<NewCompany />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
