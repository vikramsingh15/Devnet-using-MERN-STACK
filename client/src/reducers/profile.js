import {
  GET_PROFILE,
  GET_PROFILES,
  CREATE_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GIT_REPO
} from '../actions/types';

const INIT_STATE = {
  profile: null,
  loading: true,
  profiles: [],
  error: null,
  git: null
};

const profile = (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GET_PROFILE:
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case GIT_REPO:
      return {
        ...state,
        git: payload,
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default profile;
