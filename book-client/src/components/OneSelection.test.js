import { render, screen } from '@testing-library/react';
import OneSelection from './OneSelection';

describe('Selection component test', () => {
  it('component is rendered with data', async () => {
    render(<OneSelection author='author text' title='title text' email='email text' date='date text' />);
    expect(screen.getByText(/author text/i)).toBeInTheDocument();
    expect(screen.getByText(/title text/i)).toBeInTheDocument();
    expect(screen.getByText(/email text/i)).toBeInTheDocument();
    expect(screen.getByText(/date text/i)).toBeInTheDocument();
  });

});