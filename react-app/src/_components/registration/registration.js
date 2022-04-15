import React, { Component } from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { AuthenticationActionCreators } from '../../_actions';
import { setStore } from '../../_utils';
import  RegistrationHtml  from './registration.html';
import { AuthenticationService } from '../../_services/auth.service';

export class Registration extends Component {

    authService = new AuthenticationService();

    

  	constructor(props) {    
		super(props);   
    this.state = {
      user: {
        firstName: '', 
        lastName: '',
        username: '',
        password: '',
        emailOrPhone: '',  
        dob: "",
        gender: "male"
      },
      errors: {
        firstName: 'Please enter First Name!',
        lastName: 'Please enter Last Name!',
        username: 'Please enter User Name!',
        password: 'Please enter Password!',
        emailOrPhone: 'Please enter Email or Phone Number!',
        dob: 'Please select your Date of Birth!'
      },
      success: {
        username: ""
      },
      registrationStatus: '',
      userAvailableCheck: false, 
      submitted: false
		} 
    console.log(this.state);
    console.log(this.props);
    this.initialState = this.state;    
    
  	}    

    checkUserNameAvailable = (event) => {
      this.setState({ 'userAvailableCheck': false });
      const { value } = event.target;
      if(value.trim() === "") return;
      let errors = this.state.errors;
      let success = this.state.success;
      this.authService.userAvailable(this.state.user.username).then((res) =>{ 
        this.setState({ 'userAvailableCheck': true });
        if(res.data.hasOwnProperty('checkUserName') && res.data.checkUserName.isAvailable) {
          success.username = "Username Available";
        } else {
          success.username = "";
          errors.username = "Username not available";
        }
        this.setState({errors});
        this.setState({success});
      });
    }
  
    inputChange = (event) => {
        const { id, value } = event.target === undefined ? event.element : event.target;
        this.setState({ user: { ...this.state.user, ...{[id] : value } }});
        this.validationErrorMessage(event);
    }

	validationErrorMessage = (event) => {
		const { id, value } = event.target === undefined ? event.element : event.target;
		let errors = this.state.errors;
		switch (id) {
		case 'firstName': 
			errors.firstName = value.length < 1 ? 'First Name is required' : '';
			break;
		case 'lastName': 
			errors.lastName = value.length < 1 ? 'Last Name is required' : '';
			break;
		case 'username': 
		  	errors.username = value.length < 1 ? 'User Name is required' : '';
			break;
		case 'emailOrPhone': 
      errors.emailOrPhone = value.length < 1 ? 'Email or Phone is required' : '';
			break;
		case 'password': 
			errors.password = value.length < 1 ? 'Password is required' : '';
			break;
		case 'dob': 
    	errors.dob = value === null ? 'Date of Birth is required' : 
          this.dobValidation(value) ? '' : 'Age must be atleast 13 years';
			break;
		default:
			break;
		}
		this.setState({ errors });
	}

  dobValidation(value) {
    let d = new Date(value);
    let td = new Date();
    return td.getFullYear() - d.getFullYear() > 13 ? true : false;
  }
  
	handleChange = (e) => {    
		const { name, value } = e.target;    
		this.setState({ user: { ...this.state.user, ...{[name] : value } }});    
	}  
  
  validateForm = (errors) => {
		let valid = true;
		Object.entries(errors).forEach(item => {
			item && item[1].length > 0 && (valid = false)
		});
		return valid;
	}

	handleSubmit = (e) => {    
		this.setState({ submitted: true });
		e.preventDefault();
		if (this.validateForm(this.state.errors)) {
			console.info('Valid Form');
      setStore('registration', this.state.user);
      this.props.dispatch(AuthenticationActionCreators.registrationInfo(this.state.user));
      this.props.history.push('/verify-user');
   	} else {
			console.log('Invalid Form')
		}
        
	}    

  
  	render() {
    return RegistrationHtml(this) 
	} 
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    registerData: state.registerData
  }
}

export default connect(mapStateToProps)(withRouter(Registration));
