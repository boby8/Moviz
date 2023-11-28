import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
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
                description: 'description ',
                favorite_count: 0,
                id: 8281276,
                iso_639_1: 'en',
                item_count: 0,
                list_type: 'movie',
                name: 'alening',
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
});
