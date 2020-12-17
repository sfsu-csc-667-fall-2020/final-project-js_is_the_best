import React, { useEffect, useState, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import Navigationbar from "../components/Navbar/Navigationbar";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import Axios from "axios";
import '../App.css'

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

  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5004");

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      switch (message.type) {
        case "newInquiryMessage":
          if (listing && user && message.inquiry) {
            if (user._id === listing.posterId) {
              setInquiries(inquiries => {
                inquiries.forEach(inq => {
                  if (inq._id === message.inquiry._id) {
                    inq.messages = message.inquiry.messages;
                  }
                });
                return [...inquiries];
              });
            } else {
              if (inquiry && inquiry._id === message.inquiry._id) {
                setInquiry(message.inquiry);
              }
            }
          } else {
          }

          break;
        case "ImageProcessDone":
          if (listing && listing._id === message.listing._id) {
            setListing({
              ...listing,
              image100Url: message.listing.image100Url,
              image500Url: message.listing.image500Url
            });
          }
          break;
        default:
          break;
      }
    };
  }, [user, listing, inquiry, inquiries]);

  useEffect(() => {
    let objDiv = document.getElementById("scrollerDiv2");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [inquiry]);
  useEffect(() => {
    let objDivs = document.getElementsByClassName("scrollerDiv1");
    if (objDivs && objDivs.length > 0) console.log(objDivs);
    for (let objDiv of objDivs) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [inquiries]);

  return (
    <div style={{marginBottom:'5%'}}>
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
                {listing.image500Url ? (
                  <img
                    src={listing.image500Url}
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
                <p><b>Title:</b> {listing.title}</p>
                <p><b>Price:</b> ${listing.price}</p>
                <p><b>Description:</b> {listing.description}</p>
              </div>
            </div>
            {/* inquiry: */}
            <div style={{ marginBottom: 200 }}>
              {isLoggedIn ? (
                user._id === listing.posterId ? (
                  <div>
                    <h2 style={{textAlign:'center'}}>Inquiries on your post:</h2>
                    {inquiries &&
                      inquiries.map(inq => (
                        <div
                          style={{
                            padding: 20,
                            alignContent:'center',
                            marginLeft: '20%',
                            marginRight: '20%',
                          }}
                        >
                          <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}>
                            <Button
                              onClick={() => {
                                setCurrentInquiryId(
                                  currentInquiryId === inq._id ? 0 : inq._id
                                );
                              }}
                            >
                              {/* grab the users name here*/}
                              {inq.senderId}
                            </Button>
                          </div>
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
                                className="scrollerDiv1"
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
                                              : "#ff0000",
                                        }}
                                    >
                                        <div stle={{width: "100%",
                                              display: "flex" }}>
                                          <div style={{border: "0.5px solid black",
                                            borderRadius: "10px",
                                            margin: "5px",
                                            padding: "10px",
                                            display: "inline-block"
                                          }}>
                                           {message.body}
                                        </div>
                                      </div>
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
                                  style={{ width: "80%", 
                                  marginBottom: 10, 
                                  marginLeft: 'auto',
                                  marginRight: 'auto'}}
                                />
                                <div>
                                  <Button 
                                  style={{
                                  marginRight: 10
                                  }}
                                    onClick={() => {
                                      // message, listingId
                                      const message = document.getElementById(
                                        "inquiryMessage" + inq._id
                                      );
                                      if (
                                        message.value &&
                                        message.value.length > 0
                                      ) {
                                        Axios.post("/inquiry/admSendMessage", {
                                          inquiryId: inq._id,
                                          message: message.value
                                        })
                                          .then(res => {
                                            if (res.data.success) {
                                              message.value = "";
                                            }
                                          })
                                          .catch(err => {});
                                      }
                                    }}
                                  >
                                    Send
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
                      textAlign: "center",
                      marginLeft: '20%',
                      marginRight: '20%',
                      marginTop: '5%'
                    }}
                  >
                    <h2>Inquiry:</h2>
                    <div
                      id="scrollerDiv2"
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
                            <div stle={{width: "100%",
                            display: "flex" }}>
                              <div style={{border: "0.5px solid black",
                              borderRadius: "10px",
                              margin: "5px",
                              padding: "10px",
                              display: "inline-block"
                            }}>
                              {message.body}
                              </div>
                          </div>
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
                        style={{ width: "80%", 
                        marginBottom: 10, 
                        marginLeft: 'auto',
                        marginRight: 'auto' }}
                      />
                      <div>
                        <Button
                        style={{
                          marginRight: 15
                          }}
                          onClick={() => {
                            // message, listingId
                            const message = document.getElementById(
                              "inquiryMessage0"
                            );
                            if (message.value && message.value.length > 0) {
                              Axios.post("/inquiry/sendMessage", {
                                listingId: listing._id,
                                message: message.value
                              })
                                .then(res => {
                                  if (res.data.success) {
                                    message.value = "";
                                  }
                                })
                                .catch(err => {});
                            }
                          }}
                        >
                          Send
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
      <Footer />
    </div>
  );
};

export default Listing;
