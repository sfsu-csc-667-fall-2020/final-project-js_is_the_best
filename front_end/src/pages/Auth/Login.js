import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import Navigationbar from '../../components/Navbar/Navigationbar';
import NavBar_LogOut from '../../components/Navbar/NavBar_LogOut';
import Footer from '../../components/Footer/Footer';
import {useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = ()=> {
    //grabs info that user signed up with from redux store
    const isLoggedIn = useSelector(state=>state.userReducer.isLoggedIn);
    
    const [user,setUser] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('/login', user)
        .then(response => {
            if(response.data){
                this.props.history.push('/Profile');
            }
            else{
                 alert("Incorrect email or password");
            }
        }); 
    }

{
        return (
            <div>
                {isLoggedIn &&(
            <Redirect to="/" /> 
            )}
            {!isLoggedIn &&(
            <NavBar_LogOut />                
            )}
            
            <div className="container-auth">
                <h1 className="heading-auth">Log In</h1>
                <br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} required/>
                    </Form.Group>
                    <Button block size="lg" variant="primary" onClick={handleLogin}> Log In </Button>
                    <p className="forgot-password text-right"> <a href="/">Forgot password?</a></p>
                </Form>
            </div>
            <Footer />
            </div>
        )
    }
}
  
export default Login;
