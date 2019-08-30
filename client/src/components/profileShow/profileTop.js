import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const profileTop = ({
  profile: { user, location, social, website, status, company }
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={user.avatar} alt='profile' />
      <h1 className='large'>{user.name}</h1>
      <p className='lead'>
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location}</p>
      <div className='icons my-1'>
        {website && (
          <Link to={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </Link>
        )}
        {social && (
          <Fragment>
            {social.twitter && (
              <Link
                to={social.twitter}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-twitter fa-2x'></i>
              </Link>
            )}
            {social.facebook && (
              <Link
                to={social.facebook}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-facebook fa-2x'></i>
              </Link>
            )}
            {social.linkedin && (
              <Link
                to={social.linkedin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-linkedin fa-2x'></i>
              </Link>
            )}
            {social.youtube && (
              <Link
                to={social.youtube}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-youtube fa-2x'></i>
              </Link>
            )}
            {social.instagram && (
              <Link
                to={social.instagram}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-instagram fa-2x'></i>
              </Link>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default profileTop;
