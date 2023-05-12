import React from 'react';
import { render } from '@testing-library/react';
import StockList from './StockList';

test('renders StockList component without errors', () => {
  render(<StockList />);
});
