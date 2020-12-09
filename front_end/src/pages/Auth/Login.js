import React, {Component, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import Navigationbar from '../../components/Navbar/Navigationbar';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setIsLoggedIn } from '../../redux/actions/userActions';

// state = {
//     username: '',
//     password: '',
// }

handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
    console.log(this);
}

handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
}

login = (e) => {
    e.preventDefault();
    axios.post('Auth/Login', this.state)
    .then(response => {
        if(response.data){
            // dispatch(setUserName(this.state.username));
            // dispatch(setIsLoggedIn(true));
            this.props.history.push('/Profile');
        }
        else{
             alert("Incorrect username or password");
        }
    }); 
}

const Login = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const userName = useSelector(state => state.userReducer.userName);
    const state = useState();

    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    //     console.log(this);
    // }
    
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(this.state);
    // }

    // login = (e) => {
    //     e.preventDefault();
    //     axios.post('Auth/Login', this.state)
    //     .then(response => {
    //         if(response.data){
    //             // dispatch(setUserName(this.state.username));
    //             // dispatch(setIsLoggedIn(true));
    //             this.props.history.push('/Profile');
    //         }
    //         else{
    //              alert("Incorrect username or password");
    //         }
    //     }); 
    // }

    // render(){
        return (
            <div>
                <Navigationbar />
            <div className="container-auth">
                <h1 className="heading-auth">Log In</h1>
                <br />
                {/* <Form onSubmit={this.handleSubmit}> */}
                <Form>
                    <Form.Group controlId="formBasicUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter username" name="username" required/>
                        {/* <Form.Control placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange} required/> */}
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                    </Form.Group> */}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" required/>

                        {/* <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required/> */}
                    </Form.Group>
                    <Button block size="lg" variant="primary"> Log In </Button>
                    <p className="forgot-password text-right"> <a href="/">Forgot password?</a></p>
                </Form>
            </div>
            </div>
        )
    // }
}
  
export default Login;
