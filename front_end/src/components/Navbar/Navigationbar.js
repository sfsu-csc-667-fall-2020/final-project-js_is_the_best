import React from 'react'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'


const Navigationbar = ()=>{
    return(
        <div>
        <Navbar bg="dark" variant='dark' expand="lg"   >
            <Navbar.Brand href="/">JS is the Best</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/postlisting">Post Listing</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/messages">Messages</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search for listings" className="mr-sm-2" style={{marginTop:10}} />
                    <Button variant="secondary" style={{marginRight:5}}  href="/login"> Log In </Button>
                    <Button variant="outline-info"href="/signup"> Sign Up </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

        </div>
    )
}

export default Navigationbar;