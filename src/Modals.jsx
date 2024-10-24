import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const Modals = ({
  modalShow,
  setModalShow,
  setReload,
  isEdit,
  setIsEdit,
  itm,
  data,
  setData,
}) => {
  const handleClose = () => {
    setModalShow(false);
    setIsEdit(false);
    setData({ ...data, name: "", price: "", image: "" });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    const { name, price, image } = data;
    const url = `http://localhost:8000/${
      isEdit ? `updateProduct/${itm?._id}` : "createProducts"
    }`;
    axios
      .post(url, { name, price, image })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setModalShow(false);
    setReload((prev) => !prev);
    setData({ ...data, name: "", price: "", image: "" });
  };

  return (
    <div
      className={`${
        modalShow ? "modal-container show" : "modal-container hide"
      }`}
    >
      <div className="form-container">
        <form>
          <div className="form">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              placeholder="Enter product name"
              value={data?.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="form">
            <label htmlFor="productPrice">Price</label>
            <input
              type="number"
              id="productPrice"
              placeholder="Enter price"
              value={data?.price}
              onChange={handleChange}
              name="price"
            />
          </div>
          <div className="form">
            <label htmlFor="productImage">Image URL</label>
            <input
              type="text"
              id="productImage"
              placeholder="Enter image URL"
              value={data?.image}
              onChange={handleChange}
              name="image"
            />
          </div>
        </form>
        <div className="btns">
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            {isEdit ? "Update" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modals;
