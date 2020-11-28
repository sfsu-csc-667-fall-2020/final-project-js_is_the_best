import React from 'react';
import {Button} from 'react-bootstrap';
import Navigationbar from '../components/Navbar/Navigationbar';
import {useSelector} from 'react-redux';

const SingleListing = {
    img: './placeholder-image.jpg',
    title: 'Static Listing',
    price: '$6.99',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat imperdiet dui, sit amet dignissim augue pulvinar a. Sed sodales arcu in velit elementum, eu imperdiet eros venenatis. Curabitur non tortor imperdiet, fringilla arcu eu, scelerisque magna. Sed aliquet dolor turpis. Vestibulum mollis id velit luctus semper. Cras non molestie sapien, at fermentum sapien. Sed euismod mattis arcu ac fermentum. Cras a molestie sapien. Sed vulputate nisi interdum pellentesque varius. Suspendisse vel arcu faucibus, vulputate ante vitae, vulputate quam. Integer molestie volutpat sem, vel posuere tortor facilisis eget. Duis in vehicula lacus.sProin vitae diam porta, facilisis nisi a, pulvinar mi. Quisque ullamcorper vulputate justo, et feugiat arcu vestibulum sit amet. Aliquam varius, erat ac mollis imperdiet, purus mauris pharetra arcu, a aliquet eros elit iaculis ante. Maecenas laoreet, nibh quis sodales fringilla, magna dolor facilisis arcu, et laoreet erat ligula eget orci. Praesent viverra pellentesque erat ac lacinia. Morbi gravida metus nec placerat pellentesque. Nulla a velit eget quam facilisis scelerisque. Nulla ac risus lorem.',
}
const Listing = () => {
    const isLoggedIn = useSelector(state=>state.userReducer.isLoggedIn);
    return(
        <div>
         <Navigationbar />
         <br />
    <a href='/' style={{fontSize: '18px', marginLeft:'30px'}}><u> {"<"} Back to Listings</u></a>
         <div style={{margin:'5%'}}>
            <img src={SingleListing.img} alt='listing_img' style={{float: 'left', display: 'flex', height: '200px', width:'200px', marginRight: '10px', marginTop: '10px', marginBottom: '10px'}}/>
            <br></br>
            <p>Title: {SingleListing.title}</p>
            <p>Price: {SingleListing.price}</p>
            <p>Description: {SingleListing.description}</p>   
            
            {isLoggedIn &&(
            <a href="/Inquiry">           
            <Button variant='primary' size='lg' 
            style={{display: 'block', margin: '0 auto'}}>Make Inquiry</Button>
            </a>                
            )}
            {!isLoggedIn &&(
            <a href="/Login">           
            <Button variant='primary' size='lg' 
            style={{display: 'block', margin: '0 auto'}}>Please log in to view inquiries</Button>
            </a>                
            )}
        </div>
        </div>
    );
}

export default Listing;