import React from 'react'
import {Card} from 'react-bootstrap';
import {Link} from "react-router-dom"

const ListingCard = (props) => {
    return(
        <div>
            <Card style={{marginLeft: '80px', marginRight: '80px'}}>
            <Link to={'/Listing/'+props._id} params={props}>
                <Card.Header as="h5">{props.title}</Card.Header>
            </Link>
                <Card.Body>
                <Link to={'/Listing/'+props._id} params={props}>
                    {/* if the img is not there then show loging spinner */}
                    <img src={props.img} alt='listing_img' style={{float: 'left', display: 'flex', height: '120px', width:'120px', marginRight: '10px'}}/>
                </Link>
                <Card.Title>{props.price}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                </Card.Body>
                </Card>
                <br />
        </div>
    );
}

export default ListingCard