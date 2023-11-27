import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import * as constants from '../constants';
interface MovieListState {
  totalMovieList: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    data: any;
    message: string;
  };
  createdMovieList: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    data: any;
    message: string;
  };
}

const initialState = {
  totalMovieList: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: '',
  },

  createdMovieList: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: '',
  }
};

const getListRequest = (state: MovieListState, action: any) => {
  return update(state, {
    totalMovieList: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message: { $set: '' },
      data: { $set: action.payload },
    },
  });
};

const getListSuccess = (state: MovieListState, action: any) => {
  return update(state, {
    totalMovieList: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: '' },
      data: { $set: {...action.payload} },
    },
  });
};

const getListError = (state: MovieListState, action: any) => {
  return update(state, {
    totalMovieList: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      data: { $set: action.payload },
    },
  });
};
const createnewMovieRequest = (state: MovieListState, action: any) => {
  return update(state, {
    createdMovieList: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message: { $set: '' },
      data: { $set: action.payload },
    },
  });
};

const createnewMovieSuccess = (state: MovieListState, action: any) => {
  return update(state, {
    createdMovieList: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: '' },
      data: { $set: {...action.payload} },
    },
  });
};

const createnewMovieError = (state: MovieListState, action: any) => {
  return update(state, {
    createdMovieList: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      data: { $set: action.payload },
    },
  });
};

export default handleActions(
  {
    [constants.GET_MOVIE_LIST_REQUEST]: getListRequest,
    [constants.GET_MOVIE_LIST_SUCCESS]: getListSuccess,
    [constants.GET_MOVIE_LIST_ERROR]: getListError,
    [constants.POST_CREATE_NEW_MOVIE_REQUEST]: createnewMovieRequest,
    [constants.POST_CREATE_NEW_MOVIE_SUCCESS]: createnewMovieSuccess,
    [constants.POST_CREATE_NEW_MOVIE_ERROR]: createnewMovieError,
  },
  initialState
);
