import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Pricing from "./pages/pricing/Pricing";
import InventarizationPage from "./pages/InventariztionPage";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/histoy-check" />
          
          <Route path="/inventarization" element={<InventarizationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
