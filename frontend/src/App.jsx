import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Pricing from "./pages/pricing/Pricing";
import InventarizationPage from "./pages/InventariztionPage";


export default function App() {
  return (
    <>
      {/* {location.pathname === "pages" && <NavBar />} */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/histoy-check" />
          
          {/* <Route path="/layout" element={<Layout />}> */}
          <Route path="/inventarization" element={<InventarizationPage />} />
          {/* <Route path="store-history" element={<HistoryPage />} /> */}
            {/* <Route path="store-history" element={<StoreHistory />} />
            <Route path="store-history" element={<StoreHistory />} /> */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}
