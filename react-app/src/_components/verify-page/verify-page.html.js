import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import './verify-page.css';

const VerifyPageHtml = (_) => {
    //const {  passidErr, emailIdErr, authFail } = _.state.formErrors; 
    
    const { verifycode, errors, submitted, verifyStatus } = _.state;   
    return (
      <div className="home">
        <div className="container">
          <Row className="justify-content-md-center">
            <Col xl="5" lg="6" md="7" sm="8" xs="12">
                <Card>
                    <Card.Body>
                        <Card.Title>Verify User</Card.Title>
                        <Card.Body>
                            { submitted && verifyStatus.length > 0 &&  <Alert variant="info">{verifyStatus}</Alert>}
                            <Form onSubmit={_.handleSubmit}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="verifycode"
                                        label="Verification Code"
                                        className = "mb-3"
                                        className = {submitted && errors.verifycode.length > 0 ? 'showError' : ''}
                                        value={verifycode}    
                                        onChange={_.inputChange}    
                                    >
                                        <Form.Control size="lg" type="text" placeholder="Verification Code" />

                                    </FloatingLabel>
                                    { submitted && errors.verifycode.length > 0 &&  <small className='error'>{errors.verifycode}</small>}
                                </Form.Group>
                                <Form.Group>
                                    <Button size="lg" className="form-control" variant="primary" type="submit" onClick={_.registerUser}>Verify</Button>
                                </Form.Group>
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

export default VerifyPageHtml;