import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import Navigationbar from '../../components/Navbar/Navigationbar';

class Login extends Component {
    
    state = {
        email: '',
        password: '',
    }

    //placeholder functionality - to be updated
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render(){
        return (
            <div>
                <Navigationbar></Navigationbar>
            <div className="container-auth">
                <h1 className="heading-auth">Log In</h1>
                <br />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button block size="lg" variant="primary" onClick={this.handleSubmit}> Log In </Button>
                    <p className="forgot-password text-right"> <a href="/">Forgot password?</a></p>
                </Form>
            </div>
            </div>
        )
    }
}
  
export default Login;
