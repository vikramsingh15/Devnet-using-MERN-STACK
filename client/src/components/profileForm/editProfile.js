import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getCurrentUserProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';

const EditProfile = ({
  updateProfile,
  getCurrentUserProfile,
  profile: { profile, loading }
}) => {
  const [formValue, setFormValue] = useState({
    status: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    youtube,
    facebook,
    linkedin,
    instagram
  } = formValue;

  useEffect(() => {
    getCurrentUserProfile();

    if (profile) {
      setFormValue({
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        skills: loading || !profile.skills ? '' : profile.skills.join(','),
        githubusername:
          loading || !profile.githubusername ? '' : profile.githubusername,
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter: loading || !profile.social ? '' : profile.social.twitter,
        facebook: loading || !profile.social ? '' : profile.social.facebook,
        linkedin: loading || !profile.social ? '' : profile.social.linkedin,
        youtube: loading || !profile.social ? '' : profile.social.youtube,
        instagram: loading || !profile.social ? '' : profile.social.instagram
      });
    }
  }, [loading, getCurrentUserProfile]);

  const onChange = e => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateProfile(formValue);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={e => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            onChange={e => onChange(e)}
            name='company'
            value={company}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            onChange={e => onChange(e)}
            name='website'
            value={website}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            onChange={e => onChange(e)}
            name='location'
            value={location}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            onChange={e => onChange(e)}
            name='skills'
            value={skills}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            onChange={e => onChange(e)}
            name='githubusername'
            value={githubusername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            onChange={e => onChange(e)}
            name='bio'
            value={bio}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='my-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            update Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                value={twitter}
                onChange={e => onChange(e)}
                placeholder='Twitter URL'
                name='twitter'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                value={facebook}
                onChange={e => onChange(e)}
                placeholder='Facebook URL'
                name='facebook'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                value={youtube}
                onChange={e => onChange(e)}
                placeholder='YouTube URL'
                name='youtube'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                value={linkedin}
                onChange={e => onChange(e)}
                placeholder='Linkedin URL'
                name='linkedin'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                value={instagram}
                onChange={e => onChange(e)}
                placeholder='Instagram URL'
                name='instagram'
              />
            </div>
          </Fragment>
        )}
        <input
          type='submit'
          className='btn btn-primary my-1'
          value='update profile'
        />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  updateProfile: PropTypes.func,
  getCurrentUserProfile: PropTypes.func,
  profile: PropTypes.object
};

const mapStateToProps = state => ({ profile: state.profile });

export default connect(
  mapStateToProps,
  { updateProfile, getCurrentUserProfile }
)(EditProfile);
