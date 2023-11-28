import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Pagination } from '../Pagination';
import '@testing-library/jest-native/extend-expect';

const mockStore = configureStore();
const initialState = {
  Lists: {
    totalMovieList: {
      data: {
        total_pages: 5, 
      },
    },
  },
};
const store = mockStore(initialState);

describe('Pagination component', () => {
  it('renders correctly with initial page number', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Pagination page={1} handleLoadMore={() => {}} />
      </Provider>
    );

    expect(getByText('Previous')).toBeDisabled();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('Next')).not.toBeDisabled();
  });

  it('disables "Previous" button on the first page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Pagination page={1} handleLoadMore={() => {}} />
      </Provider>
    );

    expect(getByText('Previous')).toBeDisabled();
  });

  it('disables "Next" button on the last page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Pagination page={5} handleLoadMore={() => {}} />
      </Provider>
    );

    expect(getByText('Next')).toBeDisabled();
  });

  it('calls handleLoadMore with correct page number when "Previous" button is clicked', () => {
    const handleLoadMoreMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Pagination page={3} handleLoadMore={handleLoadMoreMock} />
      </Provider>
    );

    const previousButton = getByText('Previous');
    fireEvent.press(previousButton);

    expect(handleLoadMoreMock).toHaveBeenCalledWith(2);
  });

  it('calls handleLoadMore with correct page number when "Next" button is clicked', () => {
    const handleLoadMoreMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Pagination page={3} handleLoadMore={handleLoadMoreMock} />
      </Provider>
    );

    const nextButton = getByText('Next');
    fireEvent.press(nextButton);

    expect(handleLoadMoreMock).toHaveBeenCalledWith(4);
  });
});
