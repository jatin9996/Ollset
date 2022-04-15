import React from 'react';
import { connect } from 'react-redux';
import { AuthenticationActionCreators } from './_actions';
import { getStore, setStore } from './_utils';
import { RouteBody } from "./_routes/app-routes";

class App extends React.Component {

  componentDidMount() {
    console.log(this.props.profile);
    const user = getStore('user');
    if (user) {
      this.props.dispatch(AuthenticationActionCreators.login(user));
      console.log("UserProfile",this.props.profile);
    }
    fetch("https://api.ipify.org/?format=json")
      .then(response => response.json())
      .then(data => setStore('ip', { address: data.ip}));

  }
  render() {
    return (
      <div>
          <RouteBody></RouteBody>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(App);
