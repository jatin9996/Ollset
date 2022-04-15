import * as React from 'react';
import { getStore, setStore } from '../../_utils';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Row, Col, Dropdown} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import SearchField from "react-search-field";
import { Link, withRouter } from "react-router-dom";
import { LOGO, URL } from "../../_constants/constants";
import "./header.css";



const HeaderHtml = (_) => {
    //const {  passidErr, emailIdErr, authFail } = _.state.formErrors; 
    const user = getStore('user');
    let loadHtml = '';

    if(user) {
        loadHtml = 
            <Col md="4">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto d-flex">
                        <Nav.Link href="#/home" className="bold g-r-24">
                            <i className="header-menu-icon g-r-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                </svg>    
                            </i>
                            Social Events
                        </Nav.Link>
                        <Nav.Link href="#/calendar" className="bold g-r-24">
                            <i className="header-menu-icon g-r-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-event-fill" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
                                </svg>   
                            </i>
                            Calendar
                        </Nav.Link>
                        <Nav.Link href="#/calendar" className="bold">
                            <i className="header-menu-icon g-r-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                </svg>
                            </i>
                            Settings
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Col>
    } else {
        loadHtml = 
                <Col md="8" className="d-flex justify-content-end">
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <Button size="lg" className="form-control" variant="outline-secondary">Log in</Button>
                            </Link>
                            </li>
                            <li
                            className="nav-item"
                            >
                            <Link className="nav-link" to="/register">
                                <Button size="lg" className="form-control" variant="primary">Register</Button>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </Col>
    }   
    
    return (
        <>
            { _.props.profile !== null ?
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top" >
                    <div className="container-fluid">
                        <Row>

                        </Row>
                        <Col xs="8" md="4" className="d-flex justify-content-center align-items-center">
                            <Navbar.Brand href="/">
                                <img src={LOGO} alt="Logo" className="Brandlogo" />
                            </Navbar.Brand>
                            <SearchField placeholder="Type to search..."  classNames="Navsearch"/>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        </Col>
                        { loadHtml}
                        { user ? 
                            <Col xs="4" md="4" className="d-flex justify-content-end align-items-center">
                                <span className="g-r-24" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                    </svg>
                                </span>  
                                <span >
                                <Dropdown align="end">
                                        <Dropdown.Toggle id="dropdown-custom-components">
                                            <img src={`${URL}${_.props.profile.portraitImage}`} className="header-user-icon g-r-10"/>
                                            <label className="f-16 bold primary-color g-r-24">{`${_.props.profile.firstName} ${_.props.profile.lastName}`}</label>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#555360" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={_.logout}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                
                                </span>  
                                
                            </Col>
                            : ""    
                        }
                    </div>
                </Navbar>
                :
                ""
            }
        </>
    )
}

export default HeaderHtml;