import React, { Component, useState } from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import  HeaderHtml  from './header.html';
import { removeItem } from '../../_utils';

export class Header extends Component {
	
	constructor(props) {
		super(props);
	}

  logout = () => {
    removeItem('user');
    this.props.history.push('/login');
  }
	
  render() {
    return HeaderHtml(this)
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(Header));
