import { render, screen, fireEvent } from '@testing-library/react';
import ErrorModal from './ErrorModal'

describe('Error modal test', () => {
  it('not render without open prop', async () => {
    render(<ErrorModal />);
    const headingElement = screen.queryByText('Error');
    expect(headingElement).not.toBeInTheDocument();
  });
  it('render with open prop', async () => {
    render(<ErrorModal open />);
    const headingElement = screen.getByText('Error');
    expect(headingElement).toBeInTheDocument();
  });
  it('modal children prop works', async () => {
    render(<ErrorModal open heading='test heading'><div>Test content</div></ErrorModal>);
    const contentElement = screen.getByText('Test content');
    expect(contentElement).toBeInTheDocument();
  });
  it('close button works', async () => {
    const handleClose = jest.fn()
    render(<ErrorModal open handleClose={handleClose}/>);
    const closeBtn = screen.getByText(/close/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
})