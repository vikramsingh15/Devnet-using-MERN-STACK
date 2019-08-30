import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { gitRepo } from '../../actions/profile';
import Spinner from '../layout/spinner';

const GitRepo = ({ profile: { githubusername }, repos, gitRepo }) => {
  useEffect(() => {
    gitRepo(githubusername);
  }, [gitRepo]);

  return githubusername === null || repos === null ? (
    ''
  ) : (
    <div class='profile-github'>
      <h2 class='text-primary my-1'>
        <i class='fab fa-github'></i> Github Repos
      </h2>
      {repos.map(repo => {
        return (
          <Fragment>
            <div class='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li class='badge badge-primary'>
                    Stars: {repo.stargazers_count}
                  </li>
                  <li class='badge badge-dark'>Watchers: {repo.watchers}</li>
                  <li class='badge badge-light'>Forks: {repo.forks}</li>
                </ul>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({ repos: state.profile.git });

export default connect(
  mapStateToProps,
  { gitRepo }
)(GitRepo);
