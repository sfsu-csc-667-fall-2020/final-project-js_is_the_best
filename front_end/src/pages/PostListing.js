import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
//import CurrencyInput from 'react-currency-input-field';
import Footer from "../components/Footer/Footer";
import "../App.css";
import Navigationbar from "../components/Navbar/Navigationbar";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Axios from "axios";

const PostListing = () => {
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  //placeholder functionality - to be updated

  const handleSubmit = e => {
    e.preventDefault();
    const files = document.getElementById("postListing_imageFile").files;
    if (title && description && price && price > 0 && files.length > 0) {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("imageFile", files[0]);
      Axios.post("/listing/create", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(resp => {
          if (resp.data.success) {
            history.push("/");
          } else {
            alert("no no no");
          }
        })
        .catch(err => {});
    } else {
      alert("values missing");
    }
  };

  return (
    <div style={{marginBottom:'15%'}}>
      {!isLoggedIn && <Redirect to="/Login" />}
      <Redirect from="/" to="/PostListing" /> 
      <Navigationbar />
      <h1 className="heading-PostListing">Post Listing</h1>
      <div className="container-PostListing">
        <br />

        <Form.Group as={Row} controlId="formHorizontalText">
          <Form.Label column sm={2}>
            <b>Title</b>
          </Form.Label>
          <Col lg={10}>
            <Form.Control
              type="title"
              placeholder="Enter title"
              name="title"
              value={title}
              onChange={ev => {
                setTitle(ev.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalText">
          <Form.Label column sm={2}>
            <b>Description</b>
          </Form.Label>
          <Col lg={10}>
            <Form.Control
              type="description"
              as="textarea"
              rows={2}
              placeholder="Enter description"
              name="description"
              value={description}
              onChange={ev => {
                setDescription(ev.target.value);
              }}
            />
          </Col>
        </Form.Group>

        {/*Needs Work! */}
        <Form.Group as={Row} controlId="formHorizontalText">
          <Form.Label column sm={2}>
            <b>Price</b>
          </Form.Label>
          <Col lg={10}>
            {/* <CurrencyInput type="price" name="price" placeholder="Enter Price" prefix="$" defaultValue={0} 
                            allowDecimals={true} decimalsLimit={2} onChange={(value, name) => console.log(value, name)}/> */}
            <Form.Control
              type="number"
              prefix="$"
              placeholder="Enter Price"
              name="price"
              value={price}
              onChange={ev => {
                isNaN(ev.target.value)
                  ? setPrice(0)
                  : setPrice(ev.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalText">
          <Form.Label column sm={2}>
            <b>Upload Image</b>
          </Form.Label>
          <Col lg={10}>
            <Form.File id="postListing_imageFile" />
          </Col>
        </Form.Group>
        <br />
        <Button
          className="post-button"
          size="lg"
          variant="dark"
          onClick={handleSubmit}
        >
          Post
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default PostListing;
