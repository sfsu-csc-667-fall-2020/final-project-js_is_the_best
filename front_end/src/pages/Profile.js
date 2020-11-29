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
        <Row>
            <Col lg={5}>
                <Figure>
                    <Figure.Image className="profile-image" width={200} height={200} roundedCircle alt="profile_photo" src="./placeholder-image.jpg" />
                </Figure>
            </Col >
            <Col lg={7}>
                <div className="profile-info">
                <label>Name </label>
                <br />
                <label>Email</label>
                <br />
                <label>Member Since</label>
                </div>
            </Col>
        </Row>
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