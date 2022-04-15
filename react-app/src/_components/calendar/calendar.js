import React, { Component, useState } from 'react';
import { Browser, Internationalization, createElement, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { URL } from '../../_constants/constants';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import moment from 'moment';
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective
  
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from '../../_helpers/helper';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {Row, Col} from 'react-bootstrap';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import SearchField from "react-search-field";
import * as mockData from '../../mockData/datasource.json';
import { getStore } from '../../_utils';
import { CalendarService } from '../../_services/calendar.service';
import { EditForm } from './event-dialog';
import { TooltipForm } from './tooltip-dialog';
import './calendar.scss';

export class Calendar extends Component {
  calendarService = new CalendarService();
  
  constructor(props) {
    super(props);
    this.state ={
      currentView: "Week",
      currentCalendarId: 33818,
      selectedDate: new Date(),
      eventType : 'myevents',
      headerDates: {},
      data: [],
      cellData: {
        Subject: '',
        Description: '',
        IsAllDay: false,
        StartTime: '',
        Location: '',
        EndTime: '',
        RecurrenceRule: null,
        Invitees: '',
        EventType: 0,
        Repeat: "never"
      }
      
    };
   
    this.instance = new Internationalization();
    
  }

  componentDidMount() {
    this.initializeComponent();
  }

  initializeComponent = () => {
    document.getElementById('date-heading').innerHTML = document.querySelectorAll('.e-date-range .e-tbar-btn-text')[0] === undefined ? "" : document.querySelectorAll('.e-date-range .e-tbar-btn-text')[0].innerHTML;
    this.calendarService.getMyEvents("33818").then((res) => {
      let modifyData = extend([], res.data.events.items, null, true);
      modifyData.forEach((e) => {
        e.StartTime = e.startTime !== undefined ? (moment(e.startTime, "MM-DD-YYYY HH.mm A").format("MM/DD/YYYY h:mm A") === 'Invalid date' ? e.startTime : moment(e.startTime, "MM-DD-YYYY HH.mm A").format("MM/DD/YYYY h:mm A")) : e.StartTime;
        e.EndTime = e.endTime !== undefined ? (moment(e.endTime, "MM-DD-YYYY HH.mm A").format("MM/DD/YYYY h:mm A") === 'Invalid date' ? e.endTime : moment(e.endTime, "MM-DD-YYYY HH.mm A").format("MM/DD/YYYY h:mm A")) : e.EndTime;
        e.Subject = e.title;
        e.Description = e.description;
        e.Location = e.location;
        e.IsAllDay = e.IsAllDay;
        e.EventType = e.eventType === undefined ? 1 : e.eventType;
        e.Invitees = e.invitedUsers.map((item) => { return { value: item.fullName, label: item.fullName, userId: item.userId}})
        delete(e.title);
        delete(e.description);
        delete(e.startTime);
        delete(e.endTime);
        });
      modifyData = [...modifyData, ...mockData.default.remote];  
      this.setState( { data : extend([], modifyData, true) });
      
    });

  }

  
  navigation(className) {
    document.getElementsByClassName(className)[0].click();
    setTimeout(() => {
      document.getElementById('date-heading').innerHTML = document.querySelectorAll('.e-date-range .e-tbar-btn-text')[0].innerHTML;
    }, 50);
  }

  nearbyEvents() {
     navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  
  changeView = (event) => {
    this.setState({ 'currentView': event.target.value }, () => {
      document.getElementById('date-heading').innerHTML = document.querySelectorAll('.e-date-range .e-tbar-btn-text')[0].innerHTML;
    });

  }
  
  changeEventType(event) {
    this.setState({'eventType': event.target.value});
  }

  showToday(event) {
    this.setState({'selectedDate': new Date()});
  } 

  searchEvents(e) {

  }

  dateHeaderTemplate(props) {
    let dateObj = props.date.toString();
    let day = /\w+/.exec(dateObj)[0];
    let date = /\d+/.exec(dateObj)[0];
    return <div className="e-custom-header d-flex align-item-center justify-content-center">
      <div className="day align-center f-12">{day}</div>
      <div className="date align-center f-18">{date}</div>
      <div className="date align-center f-12 table-style"><a href="http://www.google.co.in" target="_blank">www.google.com</a></div>
    </div>;
  }

  onCreate(args) {
    document.getElementById('date-heading').innerHTML = document.querySelectorAll('.e-date-range .e-tbar-btn-text')[0].innerHTML;
  }

  getTimeString(value) {
      // if(new Date(value).getMinutes() !== 0){
      //   return this.instance.formatDate(value, { skeleton: 'H' });
      // } else {
        return this.instance.formatDate(value, { skeleton: 'hm' });
      //}
  }

  getEventDuration(startTime, EndTime) {
    return Math.abs(startTime - EndTime) / 36e5;
  }

  getGuestRandomColors() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }

  getGuestList(list) {
    return list.map((item, idx) => idx < 3 && (<span className="event-template-guests" style={item.portraitURL ? {background: `url(${URL}${item.portraitURL})`} : {background: `${this.getGuestRandomColors()}`}} key={idx}>{item.portraitURL ? null : item.fullName[0]}</span>));
  }

  eventTemplate(props) {
        return (<div className={props.BackgroundImage ? 'event-template-bgImage event-template-wrapper' : 'event-template-wrapper'} style={props.BackgroundImage ? {backgroundImage:`url(${props.BackgroundImage})`} : null}>
          <div className="event-template-content" style={this.getEventDuration(props.StartTime, props.EndTime) >= 2 ? null : {justifyContent: `center`}}>
            <h5 className="event-template-subject" >{props.Subject}</h5>
            {
              this.getEventDuration(props.StartTime, props.EndTime) >= 2 && 
              <>
              <div className="event-template-time">
                {this.getTimeString(props.StartTime)} - {this.getTimeString(props.EndTime)}
              </div>
              {this.getGuestList(props.invitedUsers) && <div>{this.getGuestList(props.invitedUsers)}</div>}
              </>
            }
            {
              this.getEventDuration(props.StartTime,props.EndTime) >= 3 && 
              <div className="event-template-footer">
                {props.SponsoredLogo && <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 6 4 L 0 28 L 26 28 L 32 4 L 6 4 z M 7.5625 6 L 29.4375 6 L 24.4375 26 L 2.5625 26 L 7.5625 6 z M 13.634766 8 C 11.750766 8 10.288344 8.4814375 9.2773438 9.3984375 C 8.0393437 10.522438 8.0331562 11.849 8.0351562 12 L 11.005859 12 C 11.005859 11.998 11.126141 11.005859 13.369141 11.005859 C 14.320141 11.005859 15 11.303391 15 11.525391 C 15 12.830391 7 11.965 7 18 L 14 18 L 12 24 L 15 24 L 15.759766 21.720703 L 17.058594 20.775391 L 19 24 L 23 24 L 19.955078 18.669922 L 25 15 L 21 15 L 17.0625 17.8125 L 18 15 L 17.117188 15 L 12 15 C 12 14.47 17.838578 14.194375 18.767578 12.234375 C 19.522578 10.642375 18.330766 8 13.634766 8 z"></path></svg> Company Logo</div>}
                {props.SponsoredLogo && <div><i class="icon-dollar-symbol"></i><i class="icon-group"></i><i class="icon-link"></i></div>}
              </div>
            }
          </div>
      </div>);
  }

  onEventRendered(args) {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  editorTemplateData = (data) => {
    this.setState({
      cellData: {...this.state.cellData, ...data.data}
    },() => {
      this.buttonClickActions(data.event);
      this.closeDialog();
    });
  }

  editorTemplate(props) {
    let data = {...this.state.cellData, ...props};
    console.log("before edit", data);
    return <EditForm cellData={data} eventDetails={this.editorTemplateData} buttonAction={this.buttonClickActions} closeDialog={this.closeDialog}></EditForm>;
  }
   onPopupOpen(args) {
        if (["QuickInfo"].indexOf(args.type) > -1 && this.scheduleObj.currentView !== 'Month') { 
          args.cancel = !args.data.hasOwnProperty('Id') 
          return;
        } 
        if (["QuickInfo"].indexOf(args.type) > -1 && this.scheduleObj.currentView === 'Month') { 
          args.cancel = !args.data.hasOwnProperty('Id');
          this.setState({currentView: 'Day', selectedDate: args.data.StartTime}, () => {
            document.getElementById('date-heading').innerHTML = document.querySelectorAll('.e-date-range .e-tbar-btn-text')[0] === undefined ? "" : document.querySelectorAll('.e-date-range .e-tbar-btn-text')[0].innerHTML;
          });
          return;
        } 
        if (["Editor"].indexOf(args.type) > -1) { 
          args.cancel = this.isValidAction(args.data.EndTime); 
          return;
        } 
        
    }

    onDragStart = (args) => { 
    args.cancel = this.isValidAction(args.data.EndTime); 
    } 
  
    onResizeStart = (args) => { 
      args.cancel = this.isValidAction(args.data.EndTime); 
    } 
  
    isValidAction = (date) => { 
      return !(date.getTime() > new Date().getTime()); 
    } 

    footerTemplate(props) {
        return (
            null
        );
    }

    inputChange = (event) => {
      const { id, value } = event.target;
      this.setState({ cellData: { [id]: value } });
      setTimeout(() => console.log(this.state.cellData), 200);
    }

    getSlotData = () => {
        
        const addObj = {};
        addObj.Subject = this.state.cellData.Subject;
        addObj.StartTime = this.state.cellData.StartTime ? new Date(this.state.cellData.StartTime) : new Date(this.scheduleObj.activeCellsData.startTime);
        addObj.EndTime = this.state.cellData.EndTime ? new Date(this.state.cellData.EndTime) : new Date(this.scheduleObj.activeCellsData.endTime);
        addObj.IsAllDay = this.state.cellData.IsAllDay;
        addObj.Location = this.state.cellData.Location;
        addObj.EventType = this.state.cellData.EventType;
        addObj.Description = this.state.cellData.Description;
        addObj.Repeat = this.state.cellData.Repeat;
        addObj.Invitees = this.state.cellData.Invitees;
        addObj.RecurrenceRule = isNullOrUndefined(this.state.cellData.RecurrenceRule) ? null : this.state.cellData.RecurrenceRule;
        
        return addObj;
    };

    updateEventResponse(eventData) {
        return { 
          Id: eventData.Id,
          StartTime: moment(eventData.startTime, "MM-DD-YYYY HH.mm A").format("MM/DD/YYYY h:mm A"),
          EndTime: moment(eventData.endTime, "MM-DD-YYYY HH.mm A").format("MM/DD/YYYY h:mm A")
        }
    }

    buttonClickActions = (e) => {
        const quickPopup = this.scheduleObj.element.querySelector('.e-quick-popup-wrapper');
        if (e.target.id === 'add') {
            let addObj = this.getSlotData();
            this.calendarService.addUpdateEventQuery(addObj, this.state.currentCalendarId).then((res) => {
              if(res.data.hasOwnProperty('createAddEvent') && res.data.createAddEvent.isSuccess) {
                addObj = {...addObj, ...this.updateEventResponse(res.data.createAddEvent.calendarBookingModel)} ;
                this.scheduleObj.addEvent(addObj);
              }
            });
        }
        else if (e.target.id === 'delete') {
            let eventDetails = this.scheduleObj.activeEventData.event;
            let currentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteSeries';
            }
            this.calendarService.deleteEvent(eventDetails.Id).then((res) => {
              this.scheduleObj.deleteEvent(eventDetails, currentAction);
            });
        } else if(e.target.id === 'save') {
          let eventDetails = this.scheduleObj.activeEventData.event;
          if(isNullOrUndefined(eventDetails)) {
            let addObj = this.getSlotData();
            this.calendarService.addUpdateEventQuery(addObj, this.state.currentCalendarId).then((res) => {
              if(res.data.hasOwnProperty('createAddEvent') && res.data.createAddEvent.isSuccess) {
                addObj = {...addObj, ...this.updateEventResponse(res.data.createAddEvent.calendarBookingModel)} ;
                this.scheduleObj.addEvent(addObj);
              }
            });
          } else {
            let currentAction = 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditSeries';
            }
            let saveObj = {...eventDetails, ...this.state.cellData}
            console.log("after edit", saveObj);
            this.calendarService.addUpdateEventQuery(saveObj, this.state.currentCalendarId).then((res) => {
              if(res.data.hasOwnProperty('createAddEvent') && res.data.createAddEvent.isSuccess) {
                saveObj = {...saveObj, ...this.updateEventResponse(res.data.createAddEvent.calendarBookingModel)} ;
                this.scheduleObj.saveEvent(saveObj, currentAction);
                // let data = this.state.data;
                // data.forEach((d) => {
                //   if(d.Id === saveObj.Id){
                //     d = {...saveObj}
                //   }
                // });
                // console.log("updated data", data);
                // this.setState( { data: extend([],data, null, true)}, () => {
                //   this.scheduleObj.refreshEvents();
                //   alert();
                // });

              }
            });
          }
        } else  {
            const isCellPopup = quickPopup.firstElementChild.classList.contains('e-cell-popup');
            const eventDetails = isCellPopup ? this.getSlotData() :
                this.scheduleObj.activeEventData.event;
            let currentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditSeries';
            }
            this.scheduleObj.openEditor(eventDetails, currentAction, true);
            this.scheduleObj.closeQuickInfoPopup();
            return;
        } 
        this.scheduleObj.closeQuickInfoPopup();
        this.setState({ cellData : {
          Subject: '',
          Description: '',
          IsAllDay: false,
          StartTime: '',
          EndTime: '',
          Location: '',
          RecurrenceRule: null,
          Invitees: '',
          EventType: 0,
          Repeat: "never"
        }});
    }

    closeDialog = () => {
      this.scheduleObj.closeEditor();
    }
    updateEvent = (args) => {
      if(!args.hasOwnProperty('Id')) {
        args.Id = this.scheduleObj.getEventMaxID();
        this.scheduleObj.addEvent([args]);
      }
      this.closeDialog(); 
    }

    
   eventDelete = (args) => {
       this.calendarService.deleteEvent().then((res) => {

       })
    }
   
    contentTemplate(props) {
        return (<div className="quick-info-content">
              
                <div className="e-cell-content">
                    <TooltipForm cellData={this.state.cellData} propsData={props} schedular={this.scheduleObj} buttonAction={this.buttonClickActions}></TooltipForm>        
                </div>
              </div>);
     

    }
   



  render() {
    if(this.props.profile === null)
      return <></>;
    
    const { data, currentView, selectedDate, eventType } = this.state;
    
    return (
      <>
        <Row className="mb-3 calendar-header">
          <Col>
            { this.props.profile.coverImage ? 
                <img src={`${URL}${this.props.profile.coverImage}`} width="100%"/>
              : <img src="/assets/background/bg-image.png" width="100%"/>
            }
            <Row>
              <Col className="header-action">
                <Button variant="primary" size="lg" >Follow</Button>
                <Button variant="secondary" size="lg" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-files" viewBox="0 0 16 16">
                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                  </svg>
                </Button>
              </Col>
            </Row>
            <Row className="d-flex justify-items-center">
              <Col xs="12" md="6" className="user-info d-flex align-items-end">
                {this.props.profile !== null && this.props.profile.portraitImage ? 
                  <img className="g-r-10" src={`${URL}${this.props.profile.portraitImage}`}/>
                  :
                  <img className="g-r-10" src={`/assets/images/user-icon.png`}/>
                }
                <div>
                  <div className="user-details">
                    <label className="f-16 bold primary-color g-r-10">{`${this.props.profile.firstName} ${this.props.profile.lastName}`}</label> 
                    <span className="f-14 secondary-color">{`@${this.props.profile.screenName === null ? '' : this.props.profile.screenName }`}</span>
                  </div>
                  <div className="event-info">
                    <label className="f-14 secondary-color g-r-10">Last event planned:</label> 
                    <span className="f-14 secondary-color">2 days ago</span>
                  </div>
                </div>
              </Col>
              <Col xs="12" md="6" className="d-flex align-items-center justify-content-end">
                  <label className="f-14 bold g-r-10">Share</label>
                  <i className="icon whatsapp-icon g-r-10">
                  </i>
                  <i className="icon fb-icon g-r-10">
                  </i>
                  <i className="icon twitter-icon g-r-10">
                  </i>
                  <i className="icon linkedin-icon g-r-10">
                  </i>
              </Col>
            
            </Row>
          </Col>
        </Row>
        <div className="schedule-control-section mb-3">
          <Row className="mb-3">
            <Col xl="7" lg="8" md="12" sm="12" xs="12">
              <Row className="d-flex align-items-center">
                <Col xl="8" lg="8" md="7" className="d-flex align-items-center">
                  <Button size="lg" variant="outline-secondary" className="icon-button" onClick={() => this.navigation("e-prev") }>
                    <i className="left-arrow"></i>
                  </Button>
                  <Button size="lg" variant="outline-secondary" className="icon-button" onClick={() => this.navigation("e-next") }>
                    <i className="right-arrow"></i>
                  </Button>
                  <h2 className="heading inline-heading " id="date-heading"></h2>
                </Col>
              </Row>
            </Col>
            <Col xl="5" lg="1" md="6" sm="6" xs="6" className="d-flex align-items-center justify-content-end">
                <ToggleButtonGroup type="radio" className="gap-24" name="options" defaultValue={1}>
                  
                    <ToggleButton
                      key="0"
                      id={`myevent`}
                      type="radio"
                      variant={eventType  === 'myevents' ? 'secondary' : 'odefault'}
                      name="radio"
                      value={`myevents`}
                      checked={eventType === 'myevents'}
                      onChange={(e) => this.changeEventType(e)}
                    >
                      My Events
                    </ToggleButton>
                    <ToggleButton
                      key={1}
                      id={`nearby`}
                      type="radio"
                      variant={eventType  === 'nearby' ? 'secondary' : 'odefault'}
                      name="radio"
                      value={`nearby`}
                      checked={eventType  === 'nearby'}
                      onChange={(e) => this.changeEventType(e)}
                    >
                      Near By
                    </ToggleButton>
                </ToggleButtonGroup>
                  
                <Button size="lg" variant="secondary" className="gap-24" onClick={(event) => this.showToday(event) }>
                  Today
                </Button>
                <Form.Select id="calendarView" value={currentView} onChange={this.changeView}>
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                </Form.Select>
              
              
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <span><Badge bg="light">#music</Badge></span>
              <span><Badge bg="light">#soccer</Badge></span>
              <span><Badge bg="light">#coffee</Badge></span>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col>
              <div className="col-lg-12 control-section">
                <div className="control-wrapper">
                  <ScheduleComponent
                    width="auto"
                    height="600px"
                    isResponsive="true"
                    selectedDate={selectedDate}
                    ref={t => (this.scheduleObj = t)}
                    currentView={currentView}
                    eventSettings={{ dataSource: data }}
                    editorTemplate={this.editorTemplate.bind(this)}
                    popupOpen={this.onPopupOpen.bind(this)}
                    eventRendered={this.onEventRendered.bind(this)}
                    allowDrag={`false`}
                    quickInfoTemplates={{
                        header: this.footerTemplate.bind(this),
                        content: this.contentTemplate.bind(this),
                        footer: this.footerTemplate.bind(this)
                    }}
                    dateHeaderTemplate={this.dateHeaderTemplate.bind(this)}
                    timeScale={{ slotCount: 1 }}
                    startHour='00:00' endHour='24:00' 
                    workHours={{ highlight: false }}
                    rowAutoHeight={`true`}
                  >
                    <ViewsDirective>
                      { currentView !== 'Month' ?
                       <ViewDirective option={currentView} eventTemplate={this.eventTemplate.bind(this)}/>
                       :
                       <ViewDirective option={`Month`} eventTemplate={this.eventTemplate.bind(this)}/>
                      }
                    </ViewsDirective>
                    <Inject
                      services={[
                        Day,
                        Week,
                        Month
                      ]}
                    />
                  </ScheduleComponent>
                </div>
              </div>
            </Col>
          </Row>
          
        </div>
      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(Calendar));
