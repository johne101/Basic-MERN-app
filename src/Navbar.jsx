import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { MdOutlineAdd } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart } from "react-icons/fa";

const Navbars = ({ setModalShow, total }) => {

  return (
    <>
      <Navbar>
        <Container>
          <div className="nav">
            <h3
              style={{
                fontWeight: "bold",
                color: "white",
                marginRight: "1.5rem",
              }}
            >
              Products Cart
            </h3>
            <div className="icon-container">
              <span className="cart">
                <FaShoppingCart />
              </span>
              <span className="total">{total}</span>
            </div>
          </div>
          <Nav className="ml-auto">
            <Button variant="link" onClick={() => setModalShow(true)}>
              <MdOutlineAdd size={30} />
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
