import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import './update-password.css';

const UpdatePasswordHtml = (_) => {
    //const {  passidErr, emailIdErr, authFail } = _.state.formErrors; 
    
    const { username, password, errors, submitted, updateStatus, updatedPassword } = _.state;   
    return (
      <div className="home">
        <div className="container">
          <Row className="justify-content-md-center">
            <Col xl="5" lg="6" md="7" sm="8" xs="12">
                {
                    !updatedPassword ? 
                    <Card>
                        
                            <Card.Title>Set New Password</Card.Title>
                            <Card.Body>
                                { submitted && updateStatus.length > 0 &&  <Alert variant="danger">{updateStatus}</Alert>}
                                <Form onSubmit={_.handleSubmit}>
                                    <Form.Group class="mb-3">
                                        <FloatingLabel
                                            controlId="username"
                                            inputId="username"
                                            label="Email Or Phone Number"
                                            className = "mb-3"
                                            className = {submitted && errors.username.length > 0 ? 'showError' : ''}
                                            value={username}    
                                            onChange={_.inputChange}    
                                        >
                                            <Form.Control size="lg" type="text" />

                                        </FloatingLabel>
                                        { submitted && errors.username.length > 0 &&  <small className='error'>{errors.username}</small>}
                                    </Form.Group>
                                    <Form.Group class="mb-3">
                                        <FloatingLabel
                                            controlId="password"
                                            inputId="password"
                                            label="New Password"
                                            type="password"
                                            className="mb-3"
                                            className = {submitted && errors.password.length > 0 ? 'showError' : ''} 
                                            onChange={_.inputChange}
                                            value={password}
                                        >

                                            <Form.Control size="lg" type="password" name="password"/>  
                                        </FloatingLabel>
                                        { submitted && errors.password.length > 0 &&  <small className='error'>{errors.password}</small>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Button size="lg" className="form-control" variant="primary" type="submit" onClick={_.updatePassword}>Update Password</Button>
                                    </Form.Group>
                            
                                </Form>
                            </Card.Body>
                    </Card>
                    :
                    <Card>
                        <Card.Title className="align-center">
                            <img src="/assets/images/green-tick.svg"/>
                            <br/>
                            <br/>
                            Password Updated Successfully.
                        </Card.Title>
                        <Card.Body className="align-center">
                            Redirecting you to login page shortly.
                        </Card.Body>
                    </Card>
                }
            </Col>
         
          </Row>
        </div>
      </div>

      
       
    )
}

export default UpdatePasswordHtml;