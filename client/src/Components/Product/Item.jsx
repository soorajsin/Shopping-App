import React, { useContext, useEffect } from "react";
import { ContextNavigate } from "../Context/ContextProvider";
import "./Item.css";
import { useNavigate } from "react-router-dom";

const Item = () => {
  const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const url = "http://localhost:4000";

  const product = async () => {
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

    if (res.status === 210) {
      // console.log(res);
      setUserData(res);
    } else {
      console.log("user not authorized");
    }
  };

  useEffect(() => {
    product();
  });

  const deleteProduct = async (productdata, index) => {
    const token = localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(`${url}/deleteProduct`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ productdata }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 210) {
      // console.log(res);
    } else {
      alert("You are not logged in");
    }
  };

  const goProduct = async (productdata, index) => {
    const token = await localStorage.getItem("userDataToken");

    const data = await fetch(`${url}/goProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ productdata }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 210) {
      console.log(res);
    } else {
      console.log("not added product");
    }
  };

  return (
    <>
      <div className="product">
        <div className="container">
          <div className="show">
            {userdata
              ? userdata.getData.Productdata.map((productdata, index) => (
                  <div key={index} className="show-container">
                    {index > 0 && <br />}
                    <div className="data">
                      <img src={productdata.url} alt="product" />
                      <h2>{productdata.name}</h2>
                      <h3>{productdata.title}</h3>
                      <div className="priceShopping">
                        <h3>{productdata.price} Rs</h3>
                        <i
                          onClick={() => goProduct(productdata._id, index)}
                          className="fa-sharp fa-solid fa-cart-shopping"
                        ></i>
                      </div>
                      <i
                        onClick={() => deleteProduct(productdata._id, index)}
                        className="fa-solid fa-trash"
                      ></i>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <div className="add">
            <div className="addProductItem">
              <button onClick={() => history("/addProduct")}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
