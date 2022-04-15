import React, { Component, useState } from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { AuthenticationActionCreators } from '../../_actions';
import { getStore, setStore } from '../../_utils';
import  LoginHtml  from './login.html';
import { AuthenticationService } from '../../_services/auth.service';

export class Login extends Component {
	
	authService = new AuthenticationService();
	
	constructor(props) {
		super(props);
		this.state = {
		username: '',
		password: '',
		errors: {
			username: 'Email is required!',
			password: 'Enter Password!'
		},
		loginStatus: '',
		submitted: false
		}
	}

	componentDidMount() {
		const user = getStore('user')
		if (user) {
			this.props.dispatch(AuthenticationActionCreators.login(user));
			this.props.history.push('/calendar')
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
		case 'username': 
			errors.username = value.length < 1 ? 'Email is required' : '';
			break;
		case 'password': 
			errors.password = value.length < 1 ? 'Enter Password' : '';
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

	loginForm = async (event) => {
		this.setState({ submitted: true });
		event.preventDefault();
		if (this.validateForm(this.state.errors)) {
			console.info('Valid Form')
			const user = getStore('user')
			if (user) {
				this.props.dispatch(AuthenticationActionCreators.login(user));
				this.props.history.push('/calendar')
			} else {
				this.authService.login(this.state.username, this.state.password).then((response) => {
					if(response.data.hasOwnProperty('createLogin')) {
						 this.authService.trackUserLogin(this.state.username, true);
						setStore('user', response.data.createLogin);
						this.setState(this.initialState);
						this.props.dispatch(AuthenticationActionCreators.login(response.data.createLogin));
						this.props.history.push('/calendar');
					} else {
						 this.authService.trackUserLogin(this.state.username, false);
					}
				}).catch((err) => {
					 this.authService.trackUserLogin(this.state.username, false);
					this.setState({ loginStatus: 'Login Failed! Invalid Username and Password'})
				});
			}
		} else {
			console.log('Invalid Form')
		}
	}

  render() {
	
    return LoginHtml(this)
    // const { username, password, errors, submitted, loginStatus } = this.state;
    // return (
    //   <div className="pagecenter loginForm">
    //     <form>
    //       <div className="row custom-margin custom-padding-5">
    //         <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
    //             <TextBoxComponent placeholder="First Name" floatLabelType="Auto" required="true"  />
    //              { submitted && errors.username.length > 0 &&  <label className='error'>{errors.username}</label>}
    //         </div>
    //         <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
    //             <TextBoxComponent placeholder="Last Name" floatLabelType="Auto" required="true"  />
    //              { submitted && errors.password.length > 0 &&  <label className='error'>{errors.password}</label>}
    //         </div>
    //          <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
    //               <ButtonComponent cssClass='e-primary'>Submit</ButtonComponent>
    //           </div>
    //       </div>
    //       <div className="row">
    //         <div className="col-sm-3"></div>
    //         <label htmlFor="username" className="col-sm-2 col-form-label">User Name:</label>
    //         <div className="col-sm-3 mb-2">
    //           <input type="text" value={username} name="username" onChange={(e) => { this.inputChange(e)} } className="form-control" id="username" placeholder="User Name" />
    //           { submitted && errors.username.length > 0 &&  <span className='error'>{errors.username}</span>}
    //         </div>
    //         <div className="col-sm-4">
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div className="col-sm-3"></div>
    //         <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
    //         <div className="col-sm-3 mb-2">
    //           <input type="password" value={password} autoComplete="on" name="password" onChange={(e) => { this.inputChange(e)} } className="form-control" id="password" placeholder="Password" />
    //           { submitted && errors.password.length > 0 &&  <span className='error'>{errors.password}</span>}
    //         </div>
    //         <div className="col-sm-4"></div>
    //       </div>
    //       <div className="row">
    //         <div className="col-sm-12 center mt-1">
    //           { submitted && loginStatus.length > 0 &&  <span className='error'>{loginStatus}</span>}
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div className="col-sm-12 center mt-2">
    //           <button type="submit" className="btn btn-primary" onClick={this.loginForm}>Login</button>
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div className="col-sm-4 mt-2"></div>
    //         <div className="col-sm-4 right">
    //           <a href="/register">Register</a>
    //         </div>
    //         <div className="col-sm-4 mt-2"></div>
    //       </div>
    //     </form>
    //   </div>
    // )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(Login));
