import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { AuthenticationService } from "../_services/auth.service";
import Header  from "../_components/header";
import Button from 'react-bootstrap/Button';


const LoginComponent = lazy(() => import('../_components/login'));
const RegistrationComponent = lazy(() => import('../_components/registration'));
const VerifyPageComponent = lazy(() => import('../_components/verify-page'));
const CalendarComponent = lazy(() => import('../_components/calendar'));
const ResetPasswordComponent = lazy(() => import('../_components/reset-password'));
const UpdatePasswordComponent = lazy(() => import('../_components/update-password'));



export const AppRoutes = {
  routes: [
    {
      path: "/",
      redirect: '/login',
      exact: true
    },
    {
      path: "/login",
      component: LoginComponent,
      exact: true
    },
    {
      path: "/register",
      component: RegistrationComponent,
      exact: true
    },
    {
      path: "/verify-user",
      component: VerifyPageComponent,
      exact: true
    },
    {
      path: "/reset-password",
      component: ResetPasswordComponent,
      exact: true
    },
    {
      path: "/update-password",
      component: UpdatePasswordComponent,
      exact: true
    },
    {
      path: "/calendar",
      component: CalendarComponent,
      exact: true,
      auth: true
    }
  ]
};

export class RouteBody extends Component {
  authenticationService = new AuthenticationService();

  constructor(props) {
    super(props);

    this.state = {
      body: this.prepareRoutes()
    };
    
  }

  prepareRoutes = () => {
    // let initComponent = isCustomer() ? CustomerLogin : Login;

    AppRoutes.routes.forEach((route) => {
      route.component = route.component === 'component' ? LoginComponent : route.component
    });

    let routes = AppRoutes.routes.filter((route) => route.hasOwnProperty('path'));
    let body = routes.map((routesInfo, index) => {
      if (routesInfo.hasOwnProperty("auth") && routesInfo.auth === true) { // Routes for logged in user
        return (
          <Route
            props={this.props}
            key={index}
            path={routesInfo.path}
            render={props =>
              this.authenticationService.isUserLoggedIn() ? (
                <div className='bodyWrapper'>
                  <routesInfo.component
                    {...props}
                    notificationContext={this.props.notificationContext}
                    globalContext={this.props.globalContext}
                    setLoading={this.props.setLoading}
                  />{" "}
                </div>
              ) : (
                  <Redirect to='/' />
                )
            }
          />
        )
      } else if (routesInfo.path === "/") { // Login page route 
        return (
          <Route exact path="/" key={index}>
            { this.authenticationService.isUserLoggedIn() ? <Redirect to="/calendar"/> : <Redirect to={routesInfo.redirect} /> }
          </Route>
        );
      } else { // All other routes
        return (
          <Route
            props={this.props}
            key={index}
            path={routesInfo.path}
            render={props => (
              <div className='bodyWrapper'>
                <routesInfo.component
                  {...props}
                  notificationContext={this.props.notificationContext}
                  globalContext={this.props.globalContext}
                  setLoading={this.props.setLoading} />
              </div>
            )}
            exact
          />
        );
      }
    });
    return body;
  };

  render() {
    return (
      <HashRouter>
        <Suspense fallback="Loading...">
          <Header></Header>
        
          <Switch>{this.state.body}</Switch>
        </Suspense>
      </HashRouter>)
  }
}
