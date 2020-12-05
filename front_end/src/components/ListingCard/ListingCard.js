import React from "react";
import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListingCard = props => {
  return (
    <div>
      <Card style={{ marginLeft: "80px", marginRight: "80px" }}>
        <Link to={"/Listing/" + props._id} params={props}>
          <Card.Header as="h5">{props.title}</Card.Header>
        </Link>
        <Card.Body>
          {/* if the img is not there then show loging spinner */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <div
              style={{
                marginRight: "20px",
                height: "100px",
                width: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderStyle: "solid"
              }}
            >
              {props.image100Url ? (
                <img
                  src={props.img}
                  alt="listing_img"
                  style={{
                    height: "100px",
                    width: "100px"
                  }}
                />
              ) : (
                <Spinner animation="border" />
              )}
            </div>
            <div>
              <Card.Title>${props.price}</Card.Title>
              <Card.Text>{props.description}</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default ListingCard;
