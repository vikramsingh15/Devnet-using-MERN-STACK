import {
  GET_PROFILE,
  GET_PROFILES,
  CREATE_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GIT_REPO
} from './types';
import history from '../history';
import axios from 'axios';
import { setAlert } from './alert';

//current user profile

export const getCurrentUserProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//create  current user profile

export const createProfile = formData => async dispatch => {
  try {
    const res = await axios.post('/api/profile/me', formData);
    dispatch({ type: CREATE_PROFILE, payload: res.data });
    dispatch(setAlert('Profile created successfully', 'success'));
    history.push('/dashboard');
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//update  current user profile

export const updateProfile = formData => async dispatch => {
  try {
    const res = await axios.put('/api/profile/me', formData);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Profile updated successfully', 'success'));
    history.push('/dashboard');
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//get all profiles

export const indexProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//show profile by id

export const showProfile = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/${userId}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//git repo
export const gitRepo = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({ type: GIT_REPO, payload: res.data });
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//create experience

export const createExperience = formData => async dispatch => {
  try {
    const res = await axios.post('/api/profile/experience', formData);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience created !!', 'success'));
    history.push('/dashboard');
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//delete experience

export const deleteExperience = exp_id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${exp_id}`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience deleted!!', 'success'));
    history.push('/dashboard');
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//update experience

export const updateExperience = (exp_id, formData) => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/experience/${exp_id}`, formData);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience updated!!', 'success'));
    history.push('/dashboard');
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//delete complete profile
export const deleteProfile = () => async dispatch => {
  try {
    await axios.delete('/api/profile');
    dispatch({ type: CLEAR_PROFILE });
    dispatch(setAlert('Profile deleted!!', 'success'));
    history.push('/dashboard');
  } catch (err) {
    errorHandler(err, PROFILE_ERROR, dispatch);
  }
};

//error handler
function errorHandler(err, type, dispatch) {
  const errors = err.response.data.errors;
  if (errors) {
    errors.forEach(error => {
      dispatch(setAlert(error.msg, 'danger'));
      dispatch({ type, payload: error.msg });
    });
  }
}
