import React from 'react';
import '../App.css';
//import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption'
import { Row, Col } from 'react-bootstrap';
import Navigationbar from '../components/Navbar/Navigationbar';
import Footer from '../components/Footer/Footer';

const Profile = () =>{
    return(
    <div>
        <Navigationbar />
        <div className="profile-margin">
            <div className="profile-info">
            <label>Name </label>
            <br />
            <label>Email</label>
            </div>
        </div>
        <div className="profile-margin">
            <h3 style={{marginTop: "25px"}}>My Listings</h3>
                <Row className="profile-margin">
                    <Col lg={3}>
                    <Figure><Figure.Image width={150} height={150} src="./placeholder-image.jpg" thumbnail /> 
                    <FigureCaption style={{textAlign:'center'}}>Title</FigureCaption></ Figure>
                    </Col>
                    <Col lg={3}>
                    <Figure><Figure.Image width={150} height={150} src="./placeholder-image.jpg" thumbnail /> 
                    <FigureCaption style={{textAlign:'center'}}>Title</FigureCaption></ Figure>
                    </Col>
                    <Col lg={3}>
                    <Figure><Figure.Image width={150} height={150} src="./placeholder-image.jpg" thumbnail /> 
                    <FigureCaption style={{textAlign:'center'}}>Title</FigureCaption></ Figure>
                    </Col>
                    <Col lg={3}>
                    <Figure><Figure.Image width={150} height={150} src="./placeholder-image.jpg" thumbnail /> 
                    <FigureCaption style={{textAlign:'center'}}>Title</FigureCaption></ Figure>
                    </Col>
                </Row> 
        </div>
        <Footer />
        </div>
    )
}

export default Profile;

//<Image src="./placeholder-image.png" roundedCircle style={{border:"1px solid black"}}/>