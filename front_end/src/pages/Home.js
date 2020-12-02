import React, { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard/ListingCard.js";
import Navigationbar from "../components/Navbar/Navigationbar";
import NavBar_LogOut from "../components/Navbar/NavBar_LogOut";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import Axios from "axios";

//const wsClient = new WebSocket('ws://localhost:5000')

const Home = () => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    Axios.get("/listing/getListings")
      .then(res => {
        if (res.data.success) {
          setListings(res.data.listings);
        }
      })
      .catch(err => {});
  }, []);

  return (
    <div class="Home">
      <Navigationbar />

      <div
        style={{
          fontSize: "35px",
          textAlign: "center",
          marginTop: "3%",
          marginBottom: "3%"
        }}
      >
        <u>Available Listings </u>
      </div>
      {listings.map((listing, i) => (
        <ListingCard key={i} {...listing} />
      ))}

      <ListingCard />
      <ListingCard />
      <ListingCard />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Home;
