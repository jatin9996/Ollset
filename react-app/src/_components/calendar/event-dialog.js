import React, { Component } from 'react';
import { extend, Internationalization, isNullOrUndefined } from '@syncfusion/ej2-base';
import { RecurrenceEditorComponent } from '@syncfusion/ej2-react-schedule';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';  
import { TimePickerComponent, DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { AutoCompleteControl } from '../controls/autocomplete.control';


export class EditForm extends Component {


  constructor(props) {
    super(props);
    this.isStartTimeChange = true;
    this.state = {
      cellData: { ...props.cellData },
      errors: {
        Subject: "Enter Title"
      },
      validated: false
		}  
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.rendereComplete();
    });
  }
  
    
  handleSubmit = (e) => {
    const form = document.querySelector('#editform');
    if (form.checkValidity() === false) {
      this.setState({
        validated: false
      });
      return;
    }
    this.setState({
      validated: true
    });
    
    let data = new FormData(form);
    let formResponse = {};
    for(var ele of data.entries()) {
      formResponse[ele[0]] = ele[1];
    }
    this.setState({
      cellData: {...this.state.cellData, ...{
        'RecurrenceRule': null, //this.state.recurrObj === undefined ? "" : this.state.recurrObj.value,
        'StartTime': new Date(this.state.cellData.StartTime),
        'EndTime': new Date(this.state.cellData.EndTime)
      }}
    });
    let response = {
      data: {...this.props.eventDetails,...this.state.cellData},
      event: {...e}
    };
    this.props.eventDetails(response);
    
    
  };

  getInstance = (element) => {
    return document.getElementById(element) ? document.getElementById(element).ej2_instances[0] : null;
  }
  
  isAllDayEvent = (event) => {
    let isAllDay = event.target.checked;
    this.setState({
      cellData: {...this.state.cellData, ...{['IsAllDay']: isAllDay}}
    });
  }

  inputChange = (e) => {
    let id= e.target.id;
    let value = e.target.value;
    this.setState({
      cellData: {...this.state.cellData, ...{[id] : value}}
    });
  }

  onChange(args) {
      this.setState({
      cellData: {...this.state.cellData, ...{
        'RecurrenceRule': args.value,
      }}
    });
  }
  
  rendereComplete = () => {
    this.endTimeInput = document.getElementById('EndTime');
    //let rule = isNullOrUndefined(this.state.cellData.RecurrenceRule) ? "" : this.state.cellData.RecurrenceRule
    //this.recObject.setRecurrenceRule(rule);
  }

  closeDialog = () => {
    this.props.closeDialog();
  }

  changeStart(args) {
    if (this.isStartTimeChange) {
        this.value = new Date(args.value);
        // this.value.setMinutes(this.value.getMinutes() + this.endObject.step);
        this.endObject.min = this.value;
        this.setState({
          cellData: {...this.state.cellData, ...{ StartTime: this.value}}
        });
    } else {
        this.isStartTimeChange = true;
    }
  }
  changeEnd(args) {
      this.value = new Date(args.value);
      // this.value.setMinutes(this.value.getMinutes() + this.endObject.step);
      this.startObject.max = this.value;
      this.setState({
        cellData: {...this.state.cellData, ...{ EndTime: this.value}}
      })
    
  }

  changeDate = (element) => {
    this.value = new Date(element.target.value);
    
    let startTime = this.value.setHours(this.startObject.value.getHours());
    startTime = this.value.setMinutes(this.startObject.value.getMinutes());
    startTime = this.value.setSeconds(0);
    startTime = new Date(startTime);
    
    this.value = new Date(element.target.value);
    
    let endTime = this.value.setHours(this.endObject.value.getHours());
    endTime = this.value.setMinutes(this.endObject.value.getMinutes());
    endTime = this.value.setSeconds(0);
    endTime = new Date(endTime);

    let cellData = {...this.state.cellData, ...{StartTime: startTime, EndTime: endTime}};
    
    this.setState(
        {cellData: {...cellData}}
        
    );
    // this.setState({ cellData: {...cellData}});

  }

  getInvitees = (values) => {
    this.setState({
      cellData: {...this.state.cellData, ...{'Invitees': values}}
    });
  }

  render() {

    const { cellData } = this.state;
    const minDate = new Date();
    const dateObj = new Date();
    const minTime = new Date((dateObj.setHours(dateObj.getHours()), dateObj.setMinutes(0),dateObj.setSeconds(0)));
    const maxTime = new Date((dateObj.setHours(24), dateObj.setMinutes(0),dateObj.setSeconds(0)));
    
    return (
      <Form id="editform">
        <Row >
          <Form.Group  as={Col} md="6" sm="12" className="mb-3">
              <FloatingLabel
                  controlId="Subject"
                  label="Event Title"
              >
                  <Form.Control required
                    type="text"
                    placeholder="Event Title" 
                    size="lg" 
                    name="Subject"
                    value={cellData.Subject}
                    onChange={this.inputChange}/>
              </FloatingLabel>
             <Form.Control.Feedback type="invalid">
              Please enter title of the event.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" className="mb-3">
            <DatePickerComponent required 
              id="Date" 
              placeholder="Date" 
              floatLabelType="Auto" 
              format={`MM/dd/yyyy`} 
              data-name="Date" 
              min={minDate}
              showClearButton={false} 
              value={cellData.StartTime}
              onChange={this.changeDate}
              className="e-field"></DatePickerComponent>
          </Form.Group>
        </Row>
        <Row id="time-selector">
          <Form.Group as={Col} md="6" className="mb-3" >
             <TimePickerComponent id="StartTime" step={15} showClearButton={false} ref={(mintimepick) => { this.startObject = mintimepick }} change={this.changeStart.bind(this)} 
              
              data-name="StartTime" 
              value={cellData.StartTime}
              required
              floatLabelType="Auto" 
              placeholder="From"
              min={minTime}
              enabled={!cellData.IsAllDay}
              ></TimePickerComponent>
          </Form.Group>
  
          <Form.Group as={Col} md="6" className="mb-3" >
             <TimePickerComponent id="EndTime" step={15}  showClearButton={false}  ref={(maxtimepick) => { this.endObject = maxtimepick }} change={this.changeEnd.bind(this)} 
              
              data-name="EndTime" 
              value={cellData.EndTime}
              required
              placeholder="To"
              floatLabelType="Auto" 
              min={cellData.StartTime}
              enabled={!cellData.IsAllDay}
             ></TimePickerComponent>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" className="mb-3">
              <FloatingLabel
                  controlId="Location"
                  label="Location*"
              >
                  <Form.Control required
                    type="text"
                    placeholder="Location" 
                    size="lg" 
                    name="Location"
                    value={cellData.Location}
                    onChange={this.inputChange}/>
             </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} sm="6" xs="12" className="d-flex align-items-center">
              <Form.Check 
                type="checkbox"
                data-name="IsAllDay"
                id={`IsAllDay`}
                label={`All Day`}
                checked={cellData.IsAllDay}
                onChange={this.isAllDayEvent}
              />
            </Form.Group>

            <Form.Group as={Col} sm="6" xs="12">
                <FloatingLabel
                    controlId="EventType"
                    label="Event Type"
                >
                  <Form.Select id="EventType" placeholder="Event Type" value={cellData.EventType} onChange={(event) => this.inputChange(event)}>
                    <option value="1">Public</option>
                    <option value="2">Private (Open)</option>
                    <option value="3">Private (Close)</option>
                  </Form.Select>
              </FloatingLabel>
            </Form.Group>
        </Row>
        {/* <Row>
  
          <Form.Group as={Col} md="12">
            { isNullOrUndefined(cellData.RecurrenceRule) ? "" : 
              <RecurrenceEditorComponent id='RecurrenceRule' data-name="RecurrenceRule"></RecurrenceEditorComponent>
            }
          </Form.Group>
        </Row> */}
        { cellData.EventType == 3 &&
          <Row>
            <Form.Group as={Col} md="12" className="mb-3">
              <AutoCompleteControl id="Invitees" options={[{value: 'rochak@gmail.com',label: 'Rochak', id: 1},{ value: 'banji@gmail.com', label: 'Banji', id: 2},{value: 'bola@gmail.com', label:'Bola', id: 3}, {value: 'Manager Calendar', label:'Manager Calendar', id: 33761}]} change={this.getInvitees} value={cellData.Invitees}></AutoCompleteControl>
            </Form.Group>
          </Row>

        }
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <Button id="save" variant="primary" onClick={(e) => this.handleSubmit(e)} className="g-r-10">Save</Button>
            <Button id="close" variant="secondary" onClick={this.closeDialog}>Close</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

