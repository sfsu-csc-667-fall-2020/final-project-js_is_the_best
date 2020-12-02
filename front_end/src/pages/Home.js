import React from 'react';
import ListingCard from '../components/ListingCard/ListingCard.js';
import Navigationbar from '../components/Navbar/Navigationbar';
import NavBar_LogOut from '../components/Navbar/NavBar_LogOut';
import Footer from '../components/Footer/Footer';
import {useSelector} from 'react-redux';

//const wsClient = new WebSocket('ws://localhost:5000')
const Listings = [{
    img: './placeholder-image.jpg',
    title: 'Static Listing',
    price: '$6.99',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat imperdiet dui, ',
},
{
    img: './placeholder-image.jpg',
    title: 'Static Listing',
    price: '$6.99',
    description: 'purus mauris pharetra arcu, a aliquet eros elit iaculis aPraesent viverra pellentesque erat ac lacinia. Morbi gravida metus nec placerat pellentesque.',
},
{
    img: './placeholder-image.jpg',
    title: 'Static Listing',
    price: '$6.99',
    description: ' augue pulvinar a. Sed sodales arcu in dolor turpis. Nulla a velit eget quam facilisis scelerisque. Nulla ac risus lorem.',
},
{
    img: './placeholder-image.jpg',
    title: 'Static Listing',
    price: '$6.99',
    description: 'Laugue pulvinar a. Sed aliquet dolor turpis. Vestibulum mollis id velit luctus semper. Nulla ac risus lorem.',
},
{
    img: './placeholder-image.jpg',
    title: 'Static Listing',
    price: '$6.99',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. C. Nulla ac risus lorem.',
},
]

const Home = () => {
    
    const isLoggedIn = useSelector(state=>state.userReducer.isLoggedIn);
    return(
        <div class='Home'>
            <Navigationbar />   
    
            <div style={{fontSize:'35px', textAlign:'center', marginTop:'3%', marginBottom: '3%'}}>
                <u>Available Listings </u>
            </div>
            <ListingCard />
            <ListingCard />
            <ListingCard />
            <ListingCard />
            <br /><br /><br /><br /><br />
            <Footer />
        </div>
    );
}

export default Home
