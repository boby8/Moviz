

// actions.ts
import { createAction } from 'redux-actions';
import * as constants from './constants';

export const getListRequest = createAction(constants.GET_MOVIE_LIST_REQUEST);
export const getListSuccess = createAction(constants.GET_MOVIE_LIST_SUCCESS);
export const getListError = createAction(constants.GET_MOVIE_LIST_ERROR);

export const createnewMovieRequest = createAction(constants.POST_CREATE_NEW_MOVIE_REQUEST);
export const createnewMovieSuccess = createAction(constants.POST_CREATE_NEW_MOVIE_SUCCESS);
export const createnewMovieError = createAction(constants.POST_CREATE_NEW_MOVIE_ERROR);
