import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { indexProfile } from '../../actions/profile';
import Spinner from '../layout/spinner';
import ProfileList from './profileList';

const ProfileIndex = ({ profile: { profiles, loading }, indexProfile }) => {
  useEffect(() => {
    indexProfile();
  }, [indexProfile]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop'></i> Browse and connect with
              developers
            </p>
            <div className='profiles'>
              {profiles.length > 0 ? (
                profiles.map(profile => {
                  return <ProfileList profile={profile} key={profile._id} />;
                })
              ) : (
                <h4>No profiles found.........</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileIndex.propTypes = {
  indexProfile: PropTypes.func,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ profile: state.profile });

export default connect(
  mapStateToProps,
  { indexProfile }
)(ProfileIndex);
