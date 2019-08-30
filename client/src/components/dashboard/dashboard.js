import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUserProfile } from '../../actions/profile';
import Spinner from '../layout/spinner';
import ProfileData from './profileData';

const Dashboard = ({
  profile: { profile },
  auth: { user, loading },
  getCurrentUserProfile
}) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  const createProfile = (
    <Fragment>
      <p>You have not yet setup a profile, please add some info</p>
      <Link to='/create-profile' className='btn btn-primary my-1'>
        Create Profile
      </Link>
    </Fragment>
  );

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>

      {!profile && !loading ? (
        createProfile
      ) : (
        <ProfileData experience={profile.experience} />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({ profile: state.profile, auth: state.auth });

export default connect(
  mapStateToProps,
  { getCurrentUserProfile }
)(Dashboard);
