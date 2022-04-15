import * as React from 'react';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Row, Col} from 'react-bootstrap';
import './login.css';

const LoginHtml = (_) => {
    //const {  passidErr, emailIdErr, authFail } = _.state.formErrors; 
    
    const { username, password, errors, submitted, loginStatus } = _.state;   
    return (
      <div className="home">
        <div className="container">
          <Row className="justify-content-md-center">
            <Col xl="5" lg="6" md="7" sm="8" xs="12">
                <Card>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Card.Body>
                            { submitted && loginStatus.length > 0 &&  <Alert variant="danger">{loginStatus}</Alert>}
                            <Form onSubmit={_.handleSubmit}>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        controlId="username"
                                        label="Email Or Phone Number"
                                        className = "mb-3"
                                        className = {submitted && errors.username.length > 0 ? 'showError' : ''}
                                        value={username}    
                                        onChange={_.inputChange}    
                                    >
                                        <Form.Control size="lg" type="text" placeholder="Email Or Phone Number" />

                                    </FloatingLabel>
                                    { submitted && errors.username.length > 0 &&  <small className='error'>{errors.username}</small>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        controlId="password"
                                        label="Password"
                                        type="password"
                                        className="mb-3"
                                        className = {submitted && errors.password.length > 0 ? 'showError' : ''} 
                                        onChange={_.inputChange}
                                        value={password}
                                    >

                                        <Form.Control size="lg" type="password" name="password" placeholder="Password"/>  
                                    </FloatingLabel>
                                    { submitted && errors.password.length > 0 &&  <small className='error'>{errors.password}</small>}
                                </Form.Group>
                                <p className="f-14 align-right"><Link to="/reset-password">Forgot password?</Link></p>
                                <Form.Group className="mb-3">
                                    <Button size="lg" className="form-control" variant="primary" type="submit" onClick={_.loginForm}>Log in</Button>
                                </Form.Group>
                                <p className="f-14 align-center">Don't have an account? <Link to="/register">Register</Link></p>

                            </Form>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </Col>
         
          </Row>
        </div>
      </div>

      
       
    )
}

export default LoginHtml;