import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Row, Col} from 'react-bootstrap';

import './reset-password.css';

const ResetPasswordHtml = (_) => {
    //const {  passidErr, emailIdErr, authFail } = _.state.formErrors; 
    
    const { username, errors, submitted, resetStatus, resetLinkSend } = _.state;   
    return (
      <div className="home">
        <div className="container">
          <Row className="justify-content-md-center">
            <Col xl="5" lg="6" md="7" sm="8" xs="12">
                {
                    !resetLinkSend ? 
                    <Card>
                        
                            <Card.Title>Reset Password</Card.Title>
                            <Card.Body>
                                { submitted && resetStatus.length > 0 &&  <Alert variant="danger">{resetStatus}</Alert>}
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
                                            <Form.Control size="lg" type="text" placeholder="Email Or Phone Number"/>

                                        </FloatingLabel>
                                        { submitted && errors.username.length > 0 &&  <small className='error'>{errors.username}</small>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Button size="lg" className="form-control" variant="primary" type="submit" onClick={_.sendResetLink}>Send Reset Link</Button>
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
                            Reset Link Sent
                        </Card.Title>
                        <Card.Body className="align-center">
                            <label>
                                We've sent you a password reset link. Please check your inbox and follow the instructions from there.
                            </label>
                        </Card.Body>
                        
                    </Card>
                }
            </Col>
         
          </Row>
        </div>
      </div>

      
       
    )
}

export default ResetPasswordHtml;