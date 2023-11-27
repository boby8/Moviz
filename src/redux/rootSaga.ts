import { takeLatest, all, takeEvery } from "redux-saga/effects";
import * as constants from './constants';
import {getListRequest,createnewMovieRequest} from './list/action'

export function* allActions(){
    yield takeEvery(constants.GET_MOVIE_LIST_REQUEST, getListRequest)
    yield takeEvery(constants.POST_CREATE_NEW_MOVIE_REQUEST, createnewMovieRequest)
}

export default function* rootSaga() {
    yield all([allActions()]);
  }
  