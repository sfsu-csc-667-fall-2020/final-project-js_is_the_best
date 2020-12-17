import React from 'react';
import '../App.css';
import { useState, useEffect, useRef } from "react";
import Navigationbar from '../components/Navbar/Navigationbar';
import Footer from '../components/Footer/Footer';
import {useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import ListingCard from "../components/ListingCard/ListingCard.js";
import Axios from "axios";

const Profile = () =>{

    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const [listings, setListings] = useState([]);
    
    const ws = useRef(null);
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => {
        Axios.post("/listing/getUserListings")
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

    return(
    <div style={{marginBottom:'15%'}}>
        {!isLoggedIn && <Redirect to="/Login" />}
        {isLoggedIn && 
        <div> 
          <Navigationbar />
        <div className="profile-margin">
            <div className="profile-info">
            <label>Name: {user.name}</label>
            <br />
            <label>Email: {user.email}</label>
            </div>
        </div>
        <div>
            <div
            style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: "3%",
            marginBottom: "3%",
            width: '60%'
            }}
            >
                <h3 style={{marginTop: "25px", textAlign:'center'}}>My Listings</h3>
                  {listings.map((listing, i) => (
                    <ListingCard key={i} {...listing} />
                  ))} 
            </div>
        </div>
        <Footer /></div>}
        </div>
    )
}

export default Profile;