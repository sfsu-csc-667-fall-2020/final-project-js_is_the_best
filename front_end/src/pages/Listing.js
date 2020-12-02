import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Navigationbar from "../components/Navbar/Navigationbar";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";

const Listing = props => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  let history = useHistory();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  useEffect(() => {
    if (!id) {
      history.push("/");
    } else {
      Axios.post("/listing/getListing", {
        listingId: id
      })
        .then(res => {
          if (res.data.success) {
            setListing(res.data.listing);
          } else {
            history.push("/");
          }
        })
        .catch(err => {});
    }
  }, []);

  return (
    <div>
      <Navigationbar />
      <br />
      <a href="/" style={{ fontSize: "18px", marginLeft: "30px" }}>
        <u> {"<"} Back to Listings</u>
      </a>

      <div style={{ margin: "5%" }}>
        {listing && (
          <>
            <img
              src={listing.img}
              alt="listing_img"
              style={{
                float: "left",
                display: "flex",
                height: "200px",
                width: "200px",
                marginRight: "10px",
                marginTop: "10px",
                marginBottom: "10px"
              }}
            />
            <br></br>
            <p>Title: {listing.title}</p>
            <p>Price: {listing.price}</p>
            <p>Description: {listing.description}</p>
          </>
        )}
        {isLoggedIn && (
          <a href="/Inquiry">
            <Button
              variant="primary"
              size="lg"
              style={{ display: "block", margin: "0 auto" }}
            >
              Make Inquiry
            </Button>
          </a>
        )}
        {!isLoggedIn && (
          <a href="/Login">
            <Button
              variant="primary"
              size="lg"
              style={{ display: "block", margin: "0 auto" }}
            >
              Please log in to view inquiries
            </Button>
          </a>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Listing;
