import * as React from 'react';
import { useState, useEffect } from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Row, Col } from 'react-bootstrap';


const RegistrationHtml = (_) => {
  
  const { user, errors, success, userAvailableCheck, submitted, registrationStatus } = _.state;   
  
  return (
      <div className="container">
         <Row className="justify-content-md-center">
          <Col xl="6" lg="7" md="8" sm="10" xs="12">
            <Card>
              <Card.Title>Register</Card.Title>
              <Card.Body>
                <Form className="regisform" onSubmit={_.handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group  className="mb-3">  
                        <FloatingLabel
                          controlId="firstName"
                          label="First Name"
                          className="mb-3"
                          className={submitted && errors.firstName.length > 0 ? 'showError' : ''}
                          value={user.firstName}    
                          onChange={_.inputChange}    
                        >
                          <Form.Control type="text" placeholder="First Name" />    
                        </FloatingLabel>
                          { submitted && errors.firstName.length > 0 &&  <small className='error'>{errors.firstName}</small>}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group  className="mb-3">
                        <FloatingLabel
                          controlId="lastName"
                          label="Last Name"
                          className="mb-3"
                          className={submitted && errors.lastName.length > 0 ? 'showError' : ''}
                          value={user.lastName}    
                          onChange={_.inputChange}    
                        >
                          <Form.Control type="text" placeholder="Last Name" />
                        </FloatingLabel>    
                        { submitted && errors.lastName.length > 0 &&  <small className='error'>{errors.lastName}</small>}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group  className="mb-3">
                         <FloatingLabel
                          controlId="username"
                          label="Create Username"
                          className="mb-3"
                          className = {submitted && errors.username.length > 0 ? 'showError' : ''}
                          className = {userAvailableCheck && success.username.length > 0 ? 'validInput' : ''}
                          value={user.username}    
                          onChange={_.inputChange}
                          onBlur={_.checkUserNameAvailable} 
                        >
                          <Form.Control type="text" placeholder="Username"/>

                        </FloatingLabel>
                        { userAvailableCheck && success.username.length > 0 &&  <small className='successMsg'>{success.username}</small>}
                        { userAvailableCheck && success.username.length === 0 &&  <small className='errorMsg'>{errors.username}</small>}
                        { !userAvailableCheck && submitted && errors.username.length > 0 &&  <small className='error'>{errors.username}</small>}
                      </Form.Group>
                    </Col>
                  </Row>
                   <Row>
                    <Col>
                      <Form.Group  className="mb-3">
                         <FloatingLabel
                          controlId="emailOrPhone"
                          label="Email or Phone Number"
                          className="mb-3"
                          className = {submitted && errors.emailOrPhone.length > 0 ? 'showError' : ''}
                          value={user.emailOrPhone}    
                          onChange={_.inputChange}    
                        >
                          <Form.Control type="text" placeholder="Email or Phone Number"/>    
                        </FloatingLabel>
                        { submitted && errors.emailOrPhone.length > 0 &&  <small className='error'>{errors.emailOrPhone}</small>}
                          
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label className="f-14">Gender</Form.Label>
                      <Form.Group  className="mb-3">
                          <Form.Check type="radio" name="gender"  
                                          id="male" 
                                          inline   
                                          value="male"    
                                          onChange={_.handleChange}  
                                          label="Male" 
                                          checked={user.gender === 'male'}
                                          className="f-14"
                                          />    
                          
                          <Form.Check type="radio" name="gender"  
                                          id="female"   
                                          inline
                                          value="female"    
                                          onChange={_.handleChange}  
                                          label="Female"  
                                          checked={user.gender === 'female'}
                                          className="f-14"
                                          />    
                          
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="custom-group">
                        <DatePickerComponent id="dob" value={user.dob} change={_.inputChange} placeholder="Date of Birth" floatLabelType="Auto"
                          cssClass = {submitted && errors.dob.length > 0 ? 'showError' : ''}
                        />
                        { submitted && errors.dob.length > 0 &&  <small className='error'>{errors.dob}</small>}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group  className="mb-3">
                         <FloatingLabel
                          controlId="password"
                          label="Create Password"
                          type="password"
                          className="mb-3"
                          className =  {submitted && errors.password.length > 0 ? 'showError' : ''}
                          value={user.password}    
                          onChange={_.inputChange}    
                        >
                          <Form.Control type="password" placeholder="password"/>

                        </FloatingLabel>
                        { submitted && errors.password.length > 0 &&  <small className='error'>{errors.password}</small>}
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <Form.Group  className="mb-3">
                    <div className="d-grid gap-2">
                      <Button  variant="primary" size="lg" type="submit">Create Account</Button>
                    </div>
                  </Form.Group>
                  <p className="f-14 align-center">Already have an account? <a href="/login">Signin</a></p>
                </Form>
              

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default RegistrationHtml;