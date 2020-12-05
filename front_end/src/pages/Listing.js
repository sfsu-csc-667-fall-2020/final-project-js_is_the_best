import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Navigationbar from "../components/Navbar/Navigationbar";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import Axios from "axios";

const Listing = props => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const user = useSelector(state => state.userReducer.user);
  let history = useHistory();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [currentInquiryId, setCurrentInquiryId] = useState(0);
  const [inquiry, setInquiry] = useState(null);

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

  useEffect(() => {
    // inquiry fetcher
    if (listing && user) {
      if (user._id === listing.posterId) {
        Axios.post("/inquiry/getAdmInquiries", {
          listingId: id
        })
          .then(res => {
            if (res.data.success) {
              setInquiries(res.data.inquiries);
            }
          })
          .catch(err => {});
      } else {
        Axios.post("/inquiry/getUserInquiry", {
          listingId: id
        })
          .then(res => {
            if (res.data.success) {
              setInquiry(res.data.inquiry);
            }
          })
          .catch(err => {});
      }
    }
  }, [user, listing]);

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
            <div style={{ display: "flex", marginBottom: 20 }}>
              <div
                style={{
                  marginRight: "20px",
                  height: "500px",
                  width: "500px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderStyle: "solid"
                }}
              >
                {props.image500Url ? (
                  <img
                    src={props.img}
                    alt="listing_img"
                    style={{
                      height: "500px",
                      width: "500px"
                    }}
                  />
                ) : (
                  <Spinner animation="border" />
                )}
              </div>

              <div>
                <p>Title: {listing.title}</p>
                <p>Price: {listing.price}</p>
                <p>Description: {listing.description}</p>
              </div>
            </div>
            {/* inquiry: */}
            <div style={{ marginBottom: 200 }}>
              {isLoggedIn ? (
                user._id === listing.posterId ? (
                  <div>
                    <h2>Inquiries on your post:</h2>
                    {inquiries &&
                      inquiries.map(inq => (
                        <div
                          style={{
                            borderWidth: 1,
                            borderStyle: "solid",
                            padding: 20,
                            marginBottom: 10
                          }}
                        >
                          <Button
                            onClick={() => {
                              setCurrentInquiryId(
                                currentInquiryId === inq._id ? 0 : inq._id
                              );
                            }}
                          >
                            {inq.senderId}
                          </Button>
                          {currentInquiryId === inq._id && (
                            <div
                              style={{
                                borderWidth: 1,
                                marginTop: 20,
                                borderStyle: "solid",
                                textAlign: "center"
                              }}
                            >
                              <div
                                style={{
                                  height: 350,
                                  padding: 20,
                                  overflowY: "auto"
                                }}
                              >
                                {inq &&
                                  inq.messages &&
                                  inq.messages.map(message => (
                                    <div
                                      style={{
                                        textAlign:
                                          message.senderId === user._id
                                            ? "right"
                                            : "left",
                                        color:
                                          message.senderId === user._id
                                            ? "#1700ff"
                                            : "#ff0000"
                                      }}
                                    >
                                      {message.body}
                                    </div>
                                  ))}
                              </div>
                              <div
                                style={{
                                  height: 50,
                                  display: "flex"
                                }}
                              >
                                <input
                                  id={"inquiryMessage" + inq._id}
                                  placeholder="message"
                                  style={{ width: "80%", margin: 10 }}
                                />
                                <div>
                                  <Button
                                    onClick={() => {
                                      // message, listingId
                                      const message = document.getElementById(
                                        "inquiryMessage" + inq._id
                                      ).value;
                                      if (message && message.length > 0) {
                                        Axios.post("/inquiry/admSendMessage", {
                                          inquiryId: inq._id,
                                          message: message
                                        })
                                          .then(res => {})
                                          .catch(err => {});
                                      }
                                    }}
                                  >
                                    send
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div
                    style={{
                      borderWidth: 1,
                      borderStyle: "solid",
                      textAlign: "center"
                    }}
                  >
                    <h2>Inquiry Chat:</h2>
                    <div
                      style={{
                        height: 350,
                        padding: 20,
                        overflowY: "auto"
                      }}
                    >
                      {inquiry &&
                        inquiry.messages &&
                        inquiry.messages.map(message => (
                          <div
                            style={{
                              textAlign:
                                message.senderId === user._id
                                  ? "right"
                                  : "left",
                              color:
                                message.senderId === user._id
                                  ? "#1700ff"
                                  : "#ff0000"
                            }}
                          >
                            {message.body}
                          </div>
                        ))}
                    </div>
                    <div
                      style={{
                        height: 50,
                        display: "flex"
                      }}
                    >
                      <input
                        id="inquiryMessage0"
                        placeholder="message"
                        style={{ width: "80%", margin: 10 }}
                      />
                      <div>
                        <Button
                          onClick={() => {
                            // message, listingId
                            const message = document.getElementById(
                              "inquiryMessage0"
                            ).value;
                            if (message && message.length > 0) {
                              Axios.post("/inquiry/sendMessage", {
                                listingId: listing._id,
                                message: message
                              })
                                .then(res => {})
                                .catch(err => {});
                            }
                          }}
                        >
                          send
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <Link to="/Login">
                  <Button
                    variant="primary"
                    size="lg"
                    style={{ display: "block", margin: "0 auto" }}
                  >
                    Please log in to view inquiries
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Listing;
