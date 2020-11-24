import React from 'react'
import {Card} from 'react-bootstrap';

const SingleListing = {
    img: './placeholder-image.jpg',
    title: 'Static Listing',
    price: '$6.99',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat imperdiet dui, sit amet dignissim augue pulvinar a. Sed sodales arcu in velit elementum, eu imperdiet eros venenatis. Curabitur non tortor imperdiet, fringilla arcu eu, scelerisque magna. Sed aliquet dolor turpis. Vestibulum mollis id velit luctus semper. Cras non molestie sapien, at fermentum sapien. Sed euismod mattis arcu ac fermentum. Cras a molestie sapien. Sed vulputate nisi interdum pellentesque varius. Suspendisse vel arcu faucibus, vulputate ante vitae, vulputate quam. Integer molestie volutpat sem, vel posuere tortor facilisis eget. Duis in vehicula lacus.sProin vitae diam porta, facilisis nisi a, pulvinar mi. Quisque ullamcorper vulputate justo, et feugiat arcu vestibulum sit amet. Aliquam varius, erat ac mollis imperdiet, purus mauris pharetra arcu, a aliquet eros elit iaculis ante. Maecenas laoreet, nibh quis sodales fringilla, magna dolor facilisis arcu, et laoreet erat ligula eget orci. Praesent viverra pellentesque erat ac lacinia. Morbi gravida metus nec placerat pellentesque. Nulla a velit eget quam facilisis scelerisque. Nulla ac risus lorem.',
}

const ListingCard = () => {
    return(
        <div>
            <Card style={{marginLeft: '80px', marginRight: '80px'}}>
            <a href='/Listing'>
                <Card.Header as="h5">{SingleListing.title}</Card.Header>
            </a>
                <Card.Body>
                <a href='/Listing'>
                    <img src={SingleListing.img} style={{float: 'left', display: 'flex', height: '120px', width:'120px', marginRight: '10px'}}/>
                </a>
                    <Card.Title>{SingleListing.price}</Card.Title>
                    <Card.Text>
                        {SingleListing.description}
                    </Card.Text>
                </Card.Body>
                </Card>
                <br />
        </div>
    );
}

export default ListingCard