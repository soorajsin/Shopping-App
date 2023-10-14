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
    console.log(res);

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

  return (
    <>
      <div className="product">
        <div className="container">
          <div className="show">
            {userdata
              ? userdata.getData.Productdata.map((productdata, index) => (
                  <div key={index} className="show-container">
                    {index > 0 && <br />}
                    {productdata.data}
                  </div>
                ))
              : ""}
          </div>
          <div className="add">
            <div className="addProduct">
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
