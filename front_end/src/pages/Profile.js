import React from 'react';
import '../App.css';
//import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure'

import { Row, Col } from 'react-bootstrap';

const Profile = () =>{
    return(
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
        
    )
}

export default Profile;

//<Image src="./placeholder-image.png" roundedCircle style={{border:"1px solid black"}}/>