import React from 'react'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'


const NavBar_LogOut = ()=>{
    return(
        <div>
        <Navbar bg="dark" variant='dark' expand="lg"   >
            <Navbar.Brand href="/">JS is the Best</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Button variant="secondary" style={{marginRight:5}}  href="/login"> Log In </Button>
                    <Button variant="outline-info"href="/signup"> Sign Up </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        </div>
    )
}

export default NavBar_LogOut;