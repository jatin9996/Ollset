import React, { Component, useState } from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { AuthenticationActionCreators } from '../../_actions';
import { getStore, setStore } from '../../_utils';
import  ResetPasswordHtml  from './reset-password.html';
import { AuthenticationService } from '../../_services/auth.service';

export class ResetPasswordComponent extends Component {
	
	authService = new AuthenticationService();
	
	constructor(props) {
		super(props);
		this.state = {
		username: '',
		errors: {
			username: 'Email is required!'
		},
		resetStatus: '',
		resetLinkSend: false,
		submitted: false
		}
	}

	componentDidMount() {
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
		case 'username': 
			errors.username = value.length < 1 ? 'Email is required' : '';
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

	sendResetLink = async (event) => {
		this.setState({ submitted: true });
		event.preventDefault();
		if (this.validateForm(this.state.errors)) {
			this.authService.sendResetLink(this.state.username).then((response) => {
				if(response.data.hasOwnProperty('createSendPasswordResetCode') && response.data.createSendPasswordResetCode.isSent) {
					this.setState({ resetLinkSend : true });
					this.setState(this.initialState);
				} else {
					this.setState({ resetLinkSend : false });
					this.setState({ resetStatus: 'Reset link could not be sent to entered email or phone'})
				}
			}).catch((err) => {
				this.setState({ resetStatus: 'Reset link could not be sent to entered email or phone'})
			});
		
		} else {
			console.log('Invalid Form')
		}
	}

  render() {
	
    return ResetPasswordHtml(this)
    
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(ResetPasswordComponent));
