import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import { Pagination } from '../components/pagination';
import MyList from './List';
const mockStore = configureStore([]);



describe('MyList Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      Lists: {
        totalMovieList: {
          isLoading: false,
          isSuccess: true,
          data: {
            results: [
              {
                description: 'description testing',
                favorite_count: 0,
                id: 8281277,
                iso_639_1: 'en',
                item_count: 0,
                list_type: 'movie',
                name: 'alen',
                poster_path: null,
              },
              {
                description: 'description',
                favorite_count: 0,
                id: 8281275,
                iso_639_1: 'en',
                item_count: 0,
                list_type: 'movie',
                name: 'alen2',
                poster_path: null,
              },
            ],
          },
        },
      },
    });
  });

  it('renders the component', () => {
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <MyList />
      </Provider>,
    );

    expect(getByText('My Lists')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
    expect(getByTestId('flat-list')).toBeTruthy();
  });

  it('renders correctly with loading state', () => {
    store.getState().Lists.totalMovieList.isLoading = true;
    const { getByTestId } = render(
      <Provider store={store}>
        <MyList />
      </Provider>
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders correctly with success state', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MyList />
      </Provider>
    );

    expect(getByTestId('flat-list')).toBeTruthy();
    expect(getByText('alen')).toBeTruthy();
    expect(getByText('alen2')).toBeTruthy();
  });

  it('renders error message correctly', () => {
    store.getState().Lists.totalMovieList.isSuccess = false;
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MyList />
      </Provider>
    );

    expect(getByTestId('error-container')).toBeTruthy();
    expect(getByText('Something went Wrong!')).toBeTruthy();
  });

  it('handles the "Add" button click', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <MyList />
      </Provider>
    );

    await act(async () => {
      fireEvent.press(getByText('Add'));
    });

    await waitFor(() => {
      expect(getByTestId('bottom-popup')).toBeTruthy();
    });
  });

  it("handle page change", ()=>{
    const { getByText, getByTestId } = render(
        <Provider store={store}>
          <MyList />
        </Provider>
      );

      const nextPage = getByText('Next');

      fireEvent.press(nextPage);
      

    //   expect(nextPage).toBeInTheDocument()


  })


});
