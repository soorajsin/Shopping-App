import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Item from "./Components/Product/Item";
import Product from "./Components/ShowProduct/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Item />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
