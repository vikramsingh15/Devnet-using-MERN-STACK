import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const experience = ({ profile: { experience } }) => {
  return (
    <div>
      {experience.length > 0 && (
        <Fragment>
          <h2 class='text-primary'>Experience</h2>
          {experience.map((exp, index) => {
            return (
              <div className='profile-exp bg-white p-2' key={index}>
                <div>
                  <h3 className='text-dark'>{exp.company}</h3>
                  <p>
                    <Moment format='YYYY/MM/DD'>{moment.utc(exp.from)}</Moment>{' '}
                    -{' '}
                    {exp.to === null ? (
                      ' current'
                    ) : (
                      <Moment format='YYYY/MM/DD'>{moment.utc(exp.to)}</Moment>
                    )}
                  </p>
                  <p>
                    <strong>Position: </strong>
                    {exp.title}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Fragment>
      )}
    </div>
  );
};

export default experience;
