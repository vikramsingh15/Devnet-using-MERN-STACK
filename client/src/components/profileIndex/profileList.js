import React from 'react';
import { Link } from 'react-router-dom';

const profileList = ({ profile }) => {
  return (
    <div className='profile bg-light'>
      <img className='round-img' src={profile.user.avatar} alt='profile' />
      <div>
        <h2>{profile.user.name}</h2>
        <p>{profile.status}</p>
        <p>{profile.location}</p>
        <Link to={`/profiles/${profile._id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {profile.skills.slice(0, 4).map((skill, index) => {
          return (
            <li className='text-primary' key={index}>
              <i className='fas fa-check'></i> {skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default profileList;
