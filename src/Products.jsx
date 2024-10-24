import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Button, Navbar } from "react-bootstrap";
import Modals from "./Modals";
import Navbars from "./Navbar";

const Products = () => {
  const [data, setData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [relaod, setReload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const [itm, setItm] = useState(null);
  const [datas, setDatas] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleDeleteClick = (id) => {
    setDeleteModalShow(true);
    setId(id);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/getAllProducts")
      .then((res) => setData(res?.data?.data))
      .catch((err) => console.log(err));
  }, [relaod]);

  const handleEdit = (itm) => {
    setModalShow(true);
    setIsEdit(true);
    setItm(itm);
    setDatas({
      ...datas,
      name: itm?.name,
      price: itm?.price,
      image: itm?.image,
    });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/deleteProduct/${id}`)
      .then((res) => console.log(res))

      .catch((err) => console.log(err));

    setReload((prev) => !prev);
    setDeleteModalShow(false);
  };

  return (
    <>
      <Navbars setModalShow={setModalShow} total={data?.length} />

      <div className="product-container">
        {data?.length === 0 ? (
          <div className="not-found">
            <h2>No products found...!😪</h2>
            <p onClick={() => setModalShow(true)} style={{cursor:"pointer", color:"yellow"}}>Click to add products</p>
          </div>
        ) : (
          data?.map((itm) => (
            <article className="single">
              <div className="img">
                <img src={itm?.image} alt="test" />
              </div>
              <div className="info">
                <p className="title">{itm?.name}</p>
                <p className="price">$ {itm?.price}</p>
                <div className="controls">
                  <span className="edit" onClick={() => handleEdit(itm)}>
                    <FaRegEdit />
                  </span>
                  <span
                    className="delete"
                    onClick={() => handleDeleteClick(itm?._id)}
                  >
                    <MdDelete />
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
      <Modals
        modalShow={modalShow}
        setModalShow={setModalShow}
        setReload={setReload}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        itm={itm}
        data={datas}
        setData={setDatas}
      />

      <Modal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>you want to delete this item?</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Products;
