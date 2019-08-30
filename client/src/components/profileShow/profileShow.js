import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { showProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './profileTop';
import ProfileAbout from './profileAbout';
import Experience from './experience';
import GitRepo from './gitRepo';

import Spinner from '../layout/spinner';

const ProfileShow = ({ showProfile, match, profile: { profile, loading } }) => {
  useEffect(() => {
    showProfile(match.params.id);
  }, [showProfile, match.params.id]);

  return (
    <div>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <Experience profile={profile} />
            <GitRepo profile={profile} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({ profile: state.profile });

export default connect(
  mapStateToProps,
  { showProfile }
)(ProfileShow);
