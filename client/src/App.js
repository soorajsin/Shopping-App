import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Item from "./Components/Product/Item";
import Product from "./Components/ShowProduct/Product";
import ProductAdd from "./Components/Product/Add/ProductAdd";
import ErrorPage from "./Components/Error/ErrorPage";

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
          <Route path="/addProduct" element={<ProductAdd/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
