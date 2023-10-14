import React, { useState } from "react";
import "./ProductAdd.css";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const history = useNavigate();

  const url = "http://localhost:4000";

  const [data, setData] = useState([
    {
      name: "",
      title: "",
      price: "",
      url: "",
    },
  ]);

  const addProduct = () => {
    const newForm = {
      name: "",
      title: "",
      price: "",
      url: "",
    };
    setData([...data, newForm]);
  };
  console.log(data);

  const saveProduct = async () => {
    const emptyField = data.some(
      (form) =>
        form.name === "" ||
        form.title === "" ||
        form.price === "" ||
        form.url === ""
    );

    if (emptyField) {
      alert("Please Enter All Fields...");
    } else {
      const token = await localStorage.getItem("userDataToken");
      //       console.log(token);

      const dataFetch = await fetch(`${url}/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ data }),
      });

      const res = await dataFetch.json();
      //       console.log(res);

      if (res.status === 210) {
        //         console.log(res);
        history("/");
      } else {
        console.log("data not added");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="addProduct">
        <div className="container">
          <h1>Welcome to Add Product</h1>
          <br />
          {data.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="name">Product Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter product name..."
                  value={subForm.name}
                  onChange={(e) => {
                    const contentChange = [...data];
                    contentChange[index].name = e.target.value;
                    setData(contentChange);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="title">Product Title</label>
                <br />
                <textarea
                  cols="50"
                  rows="2"
                  placeholder="Enter product title..."
                  value={subForm.title}
                  onChange={(e) => {
                    const contentChange = [...data];
                    contentChange[index].title = e.target.value;
                    setData(contentChange);
                  }}
                ></textarea>
              </div>
              <br />
              <div className="form">
                <label htmlFor="price">Product Price</label>
                <br />
                <input
                  type="number"
                  placeholder="Enter product price in Rs ..."
                  value={subForm.price}
                  onChange={(e) => {
                    const contentChange = [...data];
                    contentChange[index].price = e.target.value;
                    setData(contentChange);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="url">Product URL</label>
                <br />
                <input
                  type="url"
                  placeholder="Enter product url..."
                  value={subForm.url}
                  onChange={(e) => {
                    const contentChange = [...data];
                    contentChange[index].url = e.target.value;
                    setData(contentChange);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <div className="line"></div>
              </div>
            </div>
          ))}
          <div className="form">
            <button onClick={addProduct}>Product Add</button>
          </div>
          <br />
          <div className="form">
            <button onClick={saveProduct}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAdd;
