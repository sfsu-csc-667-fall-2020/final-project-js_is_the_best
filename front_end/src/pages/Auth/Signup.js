import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';

class Signup extends Component {
    
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        return(
        <div className="container-auth">
                <h1 className="heading-auth">Sign Up</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="username" value={this.state.username} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter Password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" style={{marginLeft:"45px"}} label="I agree to the Terms &amp; Conditions" />
                    </Form.Group>
                    <Button block size="lg" variant="primary" onClick={this.handleSubmit}> Sign Up </Button>
                    <br />
                    <p style={{textAlign:"center"}}> Already have an account? <a href="/login"><u> Log In here! </u></a></p>
                </Form>
            </div>
    )
}
}

export default Signup;