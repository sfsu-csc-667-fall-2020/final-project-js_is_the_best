import React, { useState,} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import Navigationbar from '../../components/Navbar/Navigationbar';
import Footer from '../../components/Footer/Footer';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from "../../redux/actions/userActions"
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// function validate(username, email, password, confirmPassword) {
//     const errors = [];
  
//     if (username.length === 0) {
//       errors.push("Username can't be empty");
//     }
  
//     if (email.length < 5 || email.split("").filter(x => x === "@").length !== 1 || email.indexOf(".") === -1) {
//       errors.push("Invalid Email");
//     }
  
//     if (password.length < 6) {
//       errors.push("Password should be at least 6 characters long");
//     }

//     if (confirmPassword != password) {
//         errors.push("Passwords do not match");
//       }

//     return errors;
//   }

const Signup = ()=>{
    const isLoggedIn = useSelector(state=>state.userReducer.isLoggedIn);
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
    });

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
        // console.log(userInfo)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // const { username, email, password, confirmPassword } = userInfo;
        // const errors = validate(username, email, password, confirmPassword);
        // if (errors.length > 0) {
        //   setUserInfo({ errors });
        //   return;
        // }
      }

    const handleSignUp = (e) => {
        e.preventDefault();
        axios.post('/auth/register', userInfo)
        .then(response => {
            if(response.data.success){
                dispatch(loginUser(response.data.user))
            }else{
                alert("Incorrect credentials")
            }
        })
        .catch(error => {
            console.log(error)
        });
      }
      
      {
        // const { errors } = userInfo;
        return(
            <div style={{marginBottom: '10%'}}>
                <Navigationbar />
                <div className="container-auth">
                <h1 className="heading-auth">Sign Up</h1>
                <Form>
                {/* {errors.map(error => (<p key={error}>Error: {error}</p>))} */}
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="name" value={userInfo.name} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name="email" value={userInfo.email} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={userInfo.password} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter Password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check id="agree" type="checkbox" style={{marginLeft:"45px"}} label="I agree to the Terms &amp; Conditions" />
                    </Form.Group>
                    <Button block size="lg" variant="primary" onClick={handleSignUp}> Sign Up </Button>
                    <br />
                    <p style={{textAlign:"center"}}> Already have an account? <a href="/login"><u> Log In here! </u></a></p>
                </Form>
            </div>
            <Footer />
            </div>
    )
}
}

export default Signup;