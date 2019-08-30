import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { deleteExperience, deleteProfile } from '../../actions/profile';
import { connect } from 'react-redux';

const profileData = ({ experience, deleteExperience, deleteProfile }) => {
  const renderExp = experience.map(exp => {
    return (
      <tbody key={exp._id}>
        <tr>
          <td>{exp.company}</td>
          <td className='hide-sm'>{exp.title}r</td>
          <td className='hide-sm'>
            <Moment format='YYYY/MM/DD'>{moment.utc(exp.from)}</Moment> -{' '}
            {exp.to === null ? (
              ' Now'
            ) : (
              <Moment format='YYYY/MM/DD'>{moment.utc(exp.to)}</Moment>
            )}
          </td>
          <td>
            <button
              className='btn btn-danger'
              onClick={() => deleteExperience(exp._id)}
            >
              Delete
            </button>
            <Link
              to={`/edit-experience/${exp._id}`}
              className='btn btn-warning'
            >
              Edit
            </Link>
          </td>
        </tr>
      </tbody>
    );
  });

  const renderExpTable = (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        {renderExp}
      </table>
    </Fragment>
  );

  return (
    <Fragment>
      <div className='dash-buttons'>
        <Link to='/edit-profile' className='btn btn-light'>
          <i className='fas fa-user-circle text-primary' /> Edit Profile
        </Link>
        <Link to='/create-experience' className='btn btn-light'>
          <i className='fab fa-black-tie text-primary' /> Add Experience
        </Link>
      </div>

      {experience.length > 0 ? renderExpTable : ''}

      <button className='btn btn-danger my-2' onClick={() => deleteProfile()}>
        Delete my profile now
      </button>
    </Fragment>
  );
};

export default connect(
  null,
  { deleteExperience, deleteProfile }
)(profileData);
