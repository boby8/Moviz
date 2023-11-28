import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Moviecards } from './index';

const mockItem = {
  description: 'Sample Description',
  favorite_count: 5,
  id: 123,
  iso_639_1: 'en',
  item_count: 10,
  list_type: 'popular',
  name: 'Sample Movie',
  poster_path: null,
};

describe('Moviecards component', () => {
  it('renders correctly with provided data', () => {
    const { getByText } = render(<Moviecards item={mockItem} />);

    expect(getByText('Sample Movie')).toBeTruthy();
    expect(getByText('Sample Description')).toBeTruthy();
    expect(getByText('View')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('triggers view button click event', () => {
    const { getByText } = render(<Moviecards item={mockItem} />);
    const viewButton = getByText('View');

    fireEvent.press(viewButton);

  });

  it('triggers delete button click event', () => {
    const { getByText } = render(<Moviecards item={mockItem} />);
    const deleteButton = getByText('Delete');

    fireEvent.press(deleteButton);
  });
});
