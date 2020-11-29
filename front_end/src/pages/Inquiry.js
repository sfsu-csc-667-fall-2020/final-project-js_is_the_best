import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon} from "mdbreact";
import Button from 'react-bootstrap/Button';
import Navigationbar from '../components/Navbar/Navigationbar';
import Footer from '../components/Footer/Footer';
import "../App.css";

class Inquiry extends Component {
  constructor() {
    super();
    this.state = {
      friends: [
      {
      name: "John Doe",
      message: "Hello, Are you there?",
      toRespond: 1,
      seen: false,
      active: true
      },
      {
      name: "Danny Smith",
      message: "Lorem ipsum dolor sit",
      toRespond: 0,
      seen: false,
      active: false
      },
      {
      name: "Alex Steward",
      message: "Lorem ipsum dolor sit",
      toRespond: 0,
      seen: false,
      active: false
      },
      {
      name: "Ashley Olsen",
      message: "Lorem ipsum dolor sit",
      toRespond: 0,
      seen: false,
      active: false
      },
      {
      name: "Kate Moss",
      message: "Lorem ipsum dolor sit",
      toRespond: 0,
      seen: false,
      active: false
      },
      {
      name: "Lara Croft",
      message: "Lorem ipsum dolor sit",
      toRespond: 0,
      seen: false,
      active: false
      },
      {
      name: "Brad Pitt",
      message: "Lorem ipsum dolor sit",
      toRespond: 0,
      seen: true,
      active: false
      }
      ],
      messages: [
      {
      author: "Brad Pitt",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua."
      },
      {
      author: "Lara Croft",
      message:
      " Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
      },
      {
      author: "Brad Pitt",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua."
      }
      ]
    };
}

  render() {
    return (
      <div>
        <Navigationbar />
        <br />
        <a href='/Listing' style={{fontSize: '18px', marginLeft:'30px'}}><u>{"<"}  Back to Listing</u></a>
        <MDBCard className="grey lighten-3 chat-room">
          <MDBCardBody style={{marginLeft: 100, marginRight: 100}}>
            <MDBListGroup className="list-unstyled pl-3">
              {this.state.messages.map(message => (
                <ChatMessage key={message.author} message={message} />
                ))}
              <li>
                <div className="form-group basic-textarea">
                  <textarea className="form-control pl-2 my-0" id="exampleFormControlTextarea2" rows="3" placeholder="Type your inquiry here..." />
                  <Button color="info" rounded size="sm" className="float-right mt-4"> Send </Button>
                </div>
              </li>
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
        <Footer />
      </div>
    );
  }
}

const Friend = ({
  friend: { name, message, toRespond, seen, active }
}) => (
  <MDBListGroupItem
    href="#!"
    className="d-flex justify-content-between p-2 border-light"
    style={{ backgroundColor: active ? "#eeeeee" : "" }}
  >

    <div style={{ fontSize: "0.95rem" }}>
      <strong>{name}</strong>
      <p className="text-muted">{message}</p>
    </div>
    <div>
      {seen ? (
        <span className="text-muted float-right">
          <MDBIcon className="fa-check" aria-hidden="true" />
        </span>
      ) : toRespond ? (
        <MDBBadge color="danger" className="float-right">
          {toRespond}
        </MDBBadge>
      ) : (
        <span className="text-muted float-right">
          <MDBIcon icon="reply" aria-hidden="true" />
        </span>
      )}
    </div>
  </MDBListGroupItem>
);

const ChatMessage = ({ message: { author, message } }) => (
  <li className="chat-message d-flex justify-content-between mb-4">
    <MDBCard>
      <MDBCardBody>
        <div>
          <strong className="primary-font">{author}</strong>
          <small className="pull-right text-muted">
          </small>
        </div>
        <hr />
        <p className="mb-0">{message}</p>
      </MDBCardBody>
    </MDBCard>
  </li>
);

export default Inquiry;