// saga.ts
import {put, call, PutEffect, CallEffect} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';
import * as actions from '../actions';

interface AccessTokenResponse {}

export function* getListRequest(action:any) {
 
  try {
    const accessToken: string =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2Q2ZDVhMDY0MGI3NjU3ODhiOTZmMDc3MjRmODJlZCIsInN1YiI6IjY1M2ZjZTIzMTA5Y2QwMDBhZDYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kL8hH1T0tZz829-g2JNxjwdv9l0khgPdpxAw3nmYyB4';

    const apiUrl: string =
      `https://api.themoviedb.org/3/account/20737548/lists?page=${action.payload}`;
    const response: AxiosResponse<AccessTokenResponse> = yield call(
      axios.get,
      apiUrl,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    yield put(actions.getListSuccess(response.data));
  } catch (error: any) {
    yield put(actions.getListError(error.message));
  }
}




export function* createnewMovieRequest(action:any) {
  try {
    const accessToken: string =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2Q2ZDVhMDY0MGI3NjU3ODhiOTZmMDc3MjRmODJlZCIsInN1YiI6IjY1M2ZjZTIzMTA5Y2QwMDBhZDYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kL8hH1T0tZz829-g2JNxjwdv9l0khgPdpxAw3nmYyB4';
    const session_id: string = '3b746cc20f87b86a9845de004b60d584894d7a02';

    const apiUrl: string = `https://api.themoviedb.org/3/list?session_id=${session_id}`;

    const response: AxiosResponse<AccessTokenResponse> = yield call(
      axios.post,
      apiUrl,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
          'content-type': 'application/json',
        },
      },
    );

    yield put(actions.createnewMovieSuccess(response.data));
    yield put(actions.getListRequest(1));
  } catch (error: any) {
    yield put(actions.createnewMovieError(error.message));
  }
}