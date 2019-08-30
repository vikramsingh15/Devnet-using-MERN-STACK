import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { connect } from 'react-redux';
import PrivateRoute from './routes/privateRoute';
import history from './history';
import './app.css';

import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './components/dashboard/dashboard';
import Alert from './components/layout/alert';
import CreateProfile from './components/profileForm/newProfile';
import EditProfile from './components/profileForm/editProfile';
import CreateExperience from './components/profileForm/createExperience';
import EditExperience from './components/profileForm/editExperience';
import ProfileIndex from './components/profileIndex/profileIndex';
import ProfileShow from './components/profileShow/profileShow';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router history={history}>
      <Navbar />

      <Route exact path='/' component={Landing} />
      <div className='container'>
        <Alert />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
            exact
            path='/create-profile'
            component={CreateProfile}
          />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute
            exact
            path='/create-experience'
            component={CreateExperience}
          />
          <PrivateRoute
            exact
            path='/edit-experience/:exp_id'
            component={EditExperience}
          />

          <Route exact path='/profiles' component={ProfileIndex} />

          <Route exact path='/profiles/:id' component={ProfileShow} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(
  null,
  { loadUser }
)(App);
