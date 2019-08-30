import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { updateExperience, getCurrentUserProfile } from '../../actions/profile';

const UpdateExperience = ({
  updateExperience,
  match,
  getCurrentUserProfile,
  profile: { profile, loading }
}) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  useEffect(() => {
    getCurrentUserProfile();

    if (profile) {
      const experience = profile.experience.find(
        exp => exp._id === match.params.exp_id
      );
      setFormData({
        company: loading || !experience.company ? '' : experience.company,
        title: loading || !experience.title ? '' : experience.title,
        location: loading || !experience.location ? '' : experience.location,
        from:
          loading || !experience.from ? (
            ''
          ) : (
            <Moment format='YYYY-MM-DD'>{moment.utc(experience.from)}</Moment>
          ),
        to: loading || !experience.to ? '' : experience.to,
        current: loading || !experience.current ? '' : experience.current,
        description:
          loading || !experience.description ? '' : experience.description
      });
      toggleDisabled(experience.current);
    }
  }, [getCurrentUserProfile, loading]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          console.log(formData);
          updateExperience(match.params.exp_id, formData);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

UpdateExperience.propTypes = {
  updateExperience: PropTypes.func.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { updateExperience, getCurrentUserProfile }
)(UpdateExperience);
