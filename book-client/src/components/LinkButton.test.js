import { render, screen } from '@testing-library/react';
import LinkButton from './LinkButton.jsx';
import { BrowserRouter as Router } from "react-router-dom";

describe('Link button test', () => {
  it('button is render with text', async () => {
    render(<Router><LinkButton>Button text</LinkButton></Router>);
    const element = screen.getByText('Button text');
    expect(element).toBeInTheDocument();
  });

});