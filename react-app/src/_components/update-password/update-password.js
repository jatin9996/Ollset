import React, { Component, useState } from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { AuthenticationActionCreators } from '../../_actions';
import { getStore, setStore } from '../../_utils';
import  UpdatePasswordHtml  from './update-password.html';
import { AuthenticationService } from '../../_services/auth.service';

export class UpdatePasswordComponent extends Component {
	
	authService = new AuthenticationService();
	
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
		username: '',
		password: '',
		errors: {
			username: 'Email is required!',
			password: 'Password is required!'
		},
		updateStatus: '',
		updatedPassword: false,
		submitted: false
		}
	}

	componentDidMount() {
		const user = getStore('user')
		// if (user) {
		// 	this.props.dispatch(AuthenticationActionCreators.login(user));
		// 	this.props.history.push('/calendar')
		// }
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

	updatePassword = async (event) => {
		this.setState({ submitted: true });
		event.preventDefault();
		if (this.validateForm(this.state.errors)) {
			console.info('Valid Form')
			const user = getStore('user')
			if (user) {
				this.props.dispatch(AuthenticationActionCreators.login(user));
				this.props.history.push('/calendar')
			} else {
				this.authService.updatePassword(this.state.username).then((response) => {
					if(response.data.hasOwnProperty('isSent')) {
						this.setState({ resetLinkSend : true });
						this.setState(this.initialState);
					} 
				}).catch((err) => {
					this.setState({ resetStatus: 'Reset link could not be sent to entered email or phone'})
				});
			}
		} else {
			console.log('Invalid Form')
		}
	}

  render() {
	
    return UpdatePasswordHtml(this)
    
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(UpdatePasswordComponent));
