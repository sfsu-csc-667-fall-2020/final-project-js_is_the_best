import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
//import CurrencyInput from 'react-currency-input-field';
import '../App.css';
import Navigationbar from '../components/Navbar/Navigationbar';

class PostListing  extends Component {
    
    state = {
        title: '',
        description: '',
        price: '',
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
            <h1 className="heading-PostListing">Post Listing</h1>
            <div className="container-PostListing">
                <br />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="formHorizontalText">
                        <Form.Label column sm={2}> <b>Title</b> </Form.Label>
                        <Col lg={10}>
                            <Form.Control type="title" placeholder="Enter title" name="title" value={this.state.title} onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalText">
                        <Form.Label column sm={2}> <b>Description</b> </Form.Label>
                        <Col lg={10}>
                            <Form.Control type="description" as="textarea" rows={2} placeholder="Enter description" name="description" value={this.state.description} onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    { /*Needs Work! */}
                    <Form.Group as={Row} controlId="formHorizontalText">
                        <Form.Label column sm={2}> <b>Price</b> </Form.Label>
                        <Col lg={10}>
                            {/* <CurrencyInput type="price" name="price" placeholder="Enter Price" prefix="$" defaultValue={0} 
                            allowDecimals={true} decimalsLimit={2} onChange={(value, name) => console.log(value, name)}/> */}
                            <Form.Control type="number" prefix="$" placeholder="Enter Price" name="price" value={this.state.price} onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalText">
                        <Form.Label column sm={2}> <b>Upload Image</b> </Form.Label>
                        <Col lg={10}>
                            <Form.File id="exampleFormControlFile1" />
                        </Col>
                    </Form.Group>
                    <br />
                    <Button className="post-button" size="lg" variant="dark" onClick={this.handleSubmit}>Post</Button>
                </Form>
            </div>
        </div>
        )
    }
}
  
export default PostListing ;
