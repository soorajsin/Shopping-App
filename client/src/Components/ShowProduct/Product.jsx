import React, { useContext, useEffect, useState } from "react";
import { ContextNavigate } from "../Context/ContextProvider";
import "./ProductShow.css";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const url = config.backendURL;

  const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const productData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(`${url}/validUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);

    if (navigator.onLine) {
      if (res.status === 210) {
        // console.log(res);
        setUserData(res);
      } else {
        console.log("user not found");
        history("*");
      }
    } else {
      window.location.reload();
      // history("*");
    }
  };

  useEffect(() => {
    productData();
  });

  const deleteProductShow = async (productShow, index) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(`${url}/deleteProductShow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ productShow }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 210) {
      console.log(res);
    } else {
      console.log("not delete");
      history("*");
    }
  };

  const calculateTotalPrice = () => {
    if (userdata && userdata.getData && userdata.getData.ProductShow) {
      const totalPrice = userdata.getData.ProductShow.reduce(
        (acc, productShow) => acc + productShow.price,
        0
      );
      return totalPrice;
    }
    return 0; // Default to 0 if data is not available.
  };

  const [orderStatus, setOrderStatus] = useState(null);
  const order = async () => {
    setOrderStatus("Ordering...");

    // Simulate an order process (you can replace this with your actual order logic).
    setTimeout(() => {
      setOrderStatus("Ordered Successfully");
    }, 1000);
  };

  return (
    <>
      <div className="productShow">
        <div className="container">
          <div className="show">
            {userdata
              ? userdata.getData.ProductShow.map((productShow, index) => (
                  <div key={index} className="data">
                    <img src={productShow.url} alt="product" />
                    <h2>{productShow.name}</h2>
                    <h3>{productShow.title}</h3>
                    <h4>{productShow.price} Rs</h4>
                    <i
                      onClick={() => deleteProductShow(productShow._id, index)}
                      className="fa-solid fa-trash"
                    ></i>
                  </div>
                ))
              : ""}
          </div>
          <div className="addPrice">
            Total Price: {calculateTotalPrice()} Rs
          </div>
          <div className="order">
            <button onClick={order}>Order</button>
            {orderStatus && (
              <p
                style={{
                  color:
                    orderStatus === "Ordered Successfully" ? "green" : "red",
                }}
              >
                {orderStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
