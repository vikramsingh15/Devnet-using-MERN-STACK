import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  const change = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password don't match ", 'danger');
    } else {
      register({ name, email, password });
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='form' onSubmit={e => submit(e)}>
        <div className='form-group'>
          <input
            value={name}
            onChange={e => change(e)}
            type='text'
            placeholder='Name'
            name='name'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={email}
            onChange={e => change(e)}
            type='email'
            placeholder='Email Address'
            name='email'
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            value={password}
            onChange={e => change(e)}
            type='password'
            placeholder='Password'
            name='password'
            minLength='4'
          />
        </div>
        <div className='form-group'>
          <input
            value={password2}
            onChange={e => change(e)}
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='4'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, register }
)(Register);
