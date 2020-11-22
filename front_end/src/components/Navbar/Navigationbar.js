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
                    <Nav>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/messages">Messages</Nav.Link>
                </Nav>
                </Nav>
                <Nav className="mr-auto">
                    <Form>
                        <FormControl type="text" placeholder="Search for listings" className="mr-sm-2" required />
                    </Form>
                </Nav>
                <Nav>
                    <Nav.Link href="/login">Log in</Nav.Link>
                </Nav>
                <Button variant="outline-info">
                <Nav>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav>
                </Button>
            </Navbar.Collapse>
        </Navbar>

        </div>
    )
}

export default Navigationbar;