import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import Navigationbar from '../../components/Navbar/Navigationbar';
import axios from 'axios';

function validate(username, email, password, confirmPassword) {
    const errors = [];
  
    if (username.length === 0) {
      errors.push("Username can't be empty");
    }
  
    if (email.length < 5 || email.split("").filter(x => x === "@").length !== 1 || email.indexOf(".") === -1) {
      errors.push("Invalid Email");
    }
  
    if (password.length < 6) {
      errors.push("Password should be at least 6 characters long");
    }

    if (confirmPassword != password) {
        errors.push("Passwords do not match");
      }

    return errors;
  }

class Signup extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
    }

    //placeholder functionality - to be updated
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();

        const { username, email, password, confirmPassword } = this.state;
        const errors = validate(username, email, password, confirmPassword);
        if (errors.length > 0) {
          this.setState({ errors });
          return;
        }
    
        console.log(this.state);
      }

    signUp = (e) => {
        e.preventDefault();
         axios.post('/Signup', this.state)
        .then(response => {
            this.props.history.push('/Login');
        })
        .catch(error => {
            console.log(error)
        });
      }


    render(){
        const { errors } = this.state;
        return(
            <div>
                <Navigationbar />
                <div className="container-auth">
                <h1 className="heading-auth">Sign Up</h1>
                <Form onSubmit={this.handleSubmit}>
                {errors.map(error => (<p key={error}>Error: {error}</p>))}
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="username" value={this.state.username} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name="email" value={this.state.email} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter Password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check id="agree" onChange={this.checkboxHandler} type="checkbox" style={{marginLeft:"45px"}} label="I agree to the Terms &amp; Conditions" />
                    </Form.Group>
                    <Button block size="lg" variant="primary" onClick={this.handleSubmit}> Sign Up </Button>
                    <br />
                    <p style={{textAlign:"center"}}> Already have an account? <a href="/login"><u> Log In here! </u></a></p>
                </Form>
            </div>
            </div>
    )
}
}

export default Signup;