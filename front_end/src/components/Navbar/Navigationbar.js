import React from 'react'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'


const Navigationbar = ()=>{
    return(
        <div>
        <Navbar bg="dark" variant='dark' expand="lg"   >
            <Navbar.Brand href="/">JS is the Best</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Nav.Link href="/postlisting">Post Listing</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="secondary" style={{marginRight:5}}  href="/login"> Log In </Button>
                    <Button variant="outline-info"href="/signup"> Sign Up </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

        </div>
    )
}

export default Navigationbar;