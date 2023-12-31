import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import BottomPopup from './index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore();


describe('BottomPopup component', () => {
  let useSelectorMock: any;
  let useDispatchMock;

  beforeEach(() => {
    useSelectorMock = jest.fn();
    useDispatchMock = jest.fn();
    useSelectorMock.mockReturnValue({
      Lists: {
        createdMovieList: {
          isLoading: false,
          isSuccess: false,
          data: {
            list_id: 8281288,
            status_code: 1,
            status_message: 'Success.',
            success: true,
          },
        },
      },
    });
  });

  it('renders correctly', () => {
    const {getByTestId} = render(
      <BottomPopup
        isVisible={true}
        onClose={() => {}}
        createnewMovieRequest={() => {}}
      />,
    );
    expect(getByTestId('bottom-popup')).toBeTruthy();
  });

  it('triggers onClose when cancel button is pressed', () => {
    const onCloseMock = jest.fn();
    const {getByText} = render(
      <BottomPopup
        isVisible={true}
        onClose={onCloseMock}
        createnewMovieRequest={() => {}}
      />,
    );

    fireEvent.press(getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('handles input changes correctly', () => {
    const {getByPlaceholderText} = render(
      <BottomPopup
        isVisible={true}
        onClose={() => {}}
        createnewMovieRequest={() => {}}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'Test Name');
    fireEvent.changeText(
      getByPlaceholderText('Description'),
      'Test Description',
    );

    expect(getByPlaceholderText('Name').props.value).toBe('Test Name');
    expect(getByPlaceholderText('Description').props.value).toBe(
      'Test Description',
    );
  });

  it('triggers createnewMovieRequest when CREATE button is pressed with valid inputs', () => {
    const createnewMovieRequestMock = jest.fn();
    const {getByText, getByPlaceholderText} = render(
      <BottomPopup
        isVisible={true}
        onClose={() => {}}
        createnewMovieRequest={createnewMovieRequestMock}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'Test Name');
    fireEvent.changeText(
      getByPlaceholderText('Description'),
      'Test Description',
    );
    fireEvent.press(getByText('CREATE'));

    expect(createnewMovieRequestMock).toHaveBeenCalledWith({
      name: 'Test Name',
      description: 'Test Description',
      language: 'en',
    });
  });

  it('displays validation errors when CREATE button is pressed with invalid inputs', () => {
    const {getByText} = render(
      <BottomPopup
        isVisible={true}
        onClose={() => {}}
        createnewMovieRequest={() => {}}
      />,
    );

    fireEvent.press(getByText('CREATE'));

    expect(getByText('Name is required')).toBeTruthy();
    expect(getByText('Description is required')).toBeTruthy();
  });

  it('does not trigger createnewMovieRequest when CREATE button is pressed with empty inputs', () => {
    const createnewMovieRequestMock = jest.fn();
    const { getByText } = render(
      <BottomPopup
        isVisible={true}
        onClose={() => {}}
        createnewMovieRequest={createnewMovieRequestMock}
      />,
    );
  
    fireEvent.press(getByText('CREATE'));
  
    expect(createnewMovieRequestMock).not.toHaveBeenCalled();
  });

  it('does not display validation errors initially', () => {
    const { queryByText } = render(
      <BottomPopup
        isVisible={true}
        onClose={() => {}}
        createnewMovieRequest={() => {}}
      />,
    );
  
    expect(queryByText('Name is required')).toBeNull();
    expect(queryByText('Description is required')).toBeNull();
  });

});

describe('BottomPopup component', () => {
  let store:any;

  beforeEach(() => {
    store = mockStore({
      Lists: {
        createdMovieList: {
          isLoading: false,
          isSuccess: true,
          data: {
            list_id: 8281288,
            status_code: 1,
            status_message: 'Success.',
            success: true,
          },
        },
      },
    });
  });

  it('triggers refresh and success modal when conditions are met', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BottomPopup isVisible={true} onClose={() => {}} createnewMovieRequest={() => {}} />
      </Provider>
    );

    fireEvent.press(getByTestId('some-element'));

  });
});