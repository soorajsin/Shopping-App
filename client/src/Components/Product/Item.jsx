import React, { useContext, useEffect } from "react";
import { ContextNavigate } from "../Context/ContextProvider";
import "./Item.css";

const Item = () => {
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
        {/* Welcome to Product Email:- {userdata ? userdata.getData.email : ""} */}
      </div>
    </>
  );
};

export default Item;
