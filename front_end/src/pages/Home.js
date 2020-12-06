import React, { useState, useEffect, useRef } from "react";
import ListingCard from "../components/ListingCard/ListingCard.js";
import Navigationbar from "../components/Navbar/Navigationbar";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import Axios from "axios";

const Home = () => {
  const [listings, setListings] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    Axios.get("/listing/getListings")
      .then(res => {
        if (res.data.success) {
          setListings(res.data.listings.reverse());
        }
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5004");

    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      switch (message.type) {
        case "newListing":
          setListings(listings => [message.listing].concat(listings));
          break;
        case "ImageProcessDone":
          setListings(listings => {
            listings.forEach(listing => {
              if (message.listing._id === listing._id) {
                listing.image100Url = message.listing.image100Url;
                listing.image500Url = message.listing.image500Url;
              }
            });
            return [...listings];
          });
          break;
        default:
          break;
      }
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <div class="Home" style={{ marginBottom: "15%" }}>
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
      <Footer />
    </div>
  );
};

export default Home;
