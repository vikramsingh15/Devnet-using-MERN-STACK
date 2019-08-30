import React, { Fragment } from 'react';

const profileAbout = ({ profile: { bio, skills, user } }) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{user.name}'s Bio</h2>
          <p>{bio}</p>
          <div className='line'></div>
        </Fragment>
      )}

      {skills.length > 0 && (
        <Fragment>
          <h2 className='text-primary'>Skill Set</h2>
          <div className='skills'>
            {skills.map((skill, index) => {
              return (
                <div className='p-1' key={index}>
                  <i className='fa fa-check'></i> {skill}
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default profileAbout;
