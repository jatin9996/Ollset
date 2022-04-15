import React, { Component, useState } from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { AuthenticationActionCreators } from '../../_actions';
import  VerifyPageHtml  from './verify-page.html';
import { getStore, removeItem } from '../../_utils';
import { AuthenticationService } from '../../_services/auth.service';

export class VerifyPageComponent extends Component {
	
	authService = new AuthenticationService();
	
	constructor(props) {
		super(props);
		this.state = {
			verifycode: '',
			errors: {
				verifycode: 'Please enter the verification code!'
			},
			verifyStatus: '',
			submitted: false
		}
	}

	componentDidMount() {
		const user = getStore('registration')
		if (user) {
			this.authService.getVerificationCode(user.emailOrPhone, user.firstName).then((res) => {
				console.log(res);
			});
		} else {
			this.props.history.push('/register');
		}
	}
	inputChange = (event) => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
		this.validationErrorMessage(event);
	}

	validationErrorMessage = (event) => {
		const { id, value } = event.target;
		let errors = this.state.errors;
		switch (id) {
		case 'verifycode': 
			errors.verifycode = value.length < 1 ? 'Please enter the verification code!' : '';
			break;
		default:
			break;
		}
		this.setState({ errors });
	}

	validateForm = (errors) => {
		let valid = true;
		Object.entries(errors).forEach(item => {
			item && item[1].length > 0 && (valid = false)
		});
		return valid;
	}

	registerUser = async (event) => {
		this.setState({ submitted: true });
		event.preventDefault();
		if (this.validateForm(this.state.errors)) {
			console.info('Valid Form')
			const user = getStore('registration');
			if (user) {
				user['verificationCode'] = this.state.verifycode;
				this.authService.registerUser(user).then((response) => {
					if(response.data.hasOwnProperty('createAccount')) {
						removeItem('registration');
						this.setState(this.initialState);
						this.setState({'verifyStatus': "User registered successfully!! \n You will be redirected to login page!"});
						setTimeout(() => {
							this.props.history.push('/login');
						},4000);
					}
					
				}).catch((err) => {
					this.setState({ verifyStatus: 'Verification Failed !!'})
				});
			}
		} else {
			console.log('Invalid Form')
		}
	}

  render() {
	
    return VerifyPageHtml(this)
    
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(VerifyPageComponent));
