import React, { useState } from 'react';
import { isNullOrUndefined, Internationalization } from '@syncfusion/ej2-base';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { URL } from '../../_constants/constants';

export function TooltipForm(props) {
  const [validated, setValidated] = useState(false);
  const instance = new Internationalization();

  const handleSubmit = (e) => {
    const form = document.querySelector('#tooltipform');
    if (form.checkValidity() === false) {
      return;
    }

    setValidated(true);
    let data = new FormData(form);
    let formResponse = {};
    for(var ele of data.entries()) {
      formResponse[ele[0]] = ele[1];
      props.cellData[ele[0]] = ele[1];
    }
    props.buttonAction(e);
  };
  
  const closeDialog = () => {
    props.schedular.closeEditor();
  }

  const getTimeString = (value) => {
    // if(new Date(value).getMinutes() !== 0){
    //   return this.instance.formatDate(value, { skeleton: 'H' });
    // } else {
      return instance.formatDate(value, {type: 'dateTime', skeleton: 'medium'});
    //}
}

const getGuestRandomColors = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

  return (
    <Form noValidate validated={validated} id="tooltipform">
      { props.propsData.elementType === 'cell' ? 
          <div className="e-cell-content">
            <Row >
              <Form.Group  as={Col} md="12" className="mb-3">
                  <FloatingLabel
                      controlId="Subject"
                      label="Event Title"
                  >
                      <Form.Control required
                        type="text"
                        placeholder="Event Title" 
                        size="lg" 
                        name="Subject"
                        value={props.cellData.title} 
                        placeholder="Event Title" />
                </FloatingLabel>
              </Form.Group>
              
              <Form.Group as={Col} md="12" className="mb-3">
                <FloatingLabel controlId="Description" label="Description">
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    style={{ height: '100px' }}
                    value={props.cellData.description}
                    name="Description"
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col className="d-flex justify-content-end">
                  <Button id="more-details" variant="primary" onClick={(e) => props.buttonAction(e)} className="g-r-10">More Details</Button>
                  <Button id="add" variant="secondary" onClick={(e) => handleSubmit(e)}>Add</Button>
              </Col>
            </Row>  
          </div>
        : 
          <div className="event-content">
            <div className="meeting-subject-wrap">
                {props.propsData.Subject && <h5>{props.propsData.Subject} <span>!</span></h5>}
                {props.propsData.StartTime && <p className="date">{getTimeString(props.propsData.StartTime)}</p>}
                { props.propsData.EndTime.getTime() > new Date().getTime() &&<p className="links"><a onClick={(e) => props.buttonAction(e)} href="JavaScript:void(0);">Edit <i className="icon-pencil"></i></a> {props.propsData.EventType == 3 && <a href="JavaScript:void(0);">Forward <i className="icon-right-arrow-1"></i></a>}</p>}
                <div className="sponsored"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 6 4 L 0 28 L 26 28 L 32 4 L 6 4 z M 7.5625 6 L 29.4375 6 L 24.4375 26 L 2.5625 26 L 7.5625 6 z M 13.634766 8 C 11.750766 8 10.288344 8.4814375 9.2773438 9.3984375 C 8.0393437 10.522438 8.0331562 11.849 8.0351562 12 L 11.005859 12 C 11.005859 11.998 11.126141 11.005859 13.369141 11.005859 C 14.320141 11.005859 15 11.303391 15 11.525391 C 15 12.830391 7 11.965 7 18 L 14 18 L 12 24 L 15 24 L 15.759766 21.720703 L 17.058594 20.775391 L 19 24 L 23 24 L 19.955078 18.669922 L 25 15 L 21 15 L 17.0625 17.8125 L 18 15 L 17.117188 15 L 12 15 C 12 14.47 17.838578 14.194375 18.767578 12.234375 C 19.522578 10.642375 18.330766 8 13.634766 8 z"></path></svg>Company Logo <i class="icon-dollar-symbol"></i><i class="icon-group"></i><i class="icon-link"></i></div>
                {props.propsData.invitedUsers.length > 0 && <p className="guests-numbers">{props.propsData.invitedUsers.length} guests</p>}
                <ul className="guests-list">
                  {props.propsData.invitedUsers.map((item, idx) => 
                    (<li key={item.userId}>
                      <span className="guests-avatar" style={item.portraitURL ? {background: `url(${URL}${item.portraitURL})`} : {background: `${getGuestRandomColors()}`}} key={idx}>{item.portraitURL ? null : item.fullName[0]}</span>
                      <span className="guests-name">{item.fullName}</span>
                      <span className="guests-email">{item.username}</span>
                  </li>)
                  )}
                </ul>
                <span>{props.cellData.Description}</span>
            </div>
          </div>
      }
    </Form>
  );
}
