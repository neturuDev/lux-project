import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal'


describe('Modal test', () => {
  it('modal is not in document without open parameter', async () => {
    render(<Modal heading='test heading'/>);
    const headingElement = screen.queryByText('test heading');
    expect(headingElement).not.toBeInTheDocument();
  });

  it('modal is in document with open parameter and parameter heading works', async () => {
    render(<Modal open heading='test heading'/>);
    const headingElement = screen.getByText('test heading');
    expect(headingElement).toBeInTheDocument();
  });

  it('modal children prop works', async () => {
    render(<Modal open heading='test heading'><div>Test content</div></Modal>);
    const contentElement = screen.getByText('Test content');
    expect(contentElement).toBeInTheDocument();
  });

  it('cancel button works', async () => {
    const handleClose = jest.fn()
    render(<Modal open handleClose={handleClose}/>);
    const closeBtn = screen.getByText(/cancel/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('submit button works', async () => {
    const handleSubmit = jest.fn()
    render(<Modal open handleSubmit={handleSubmit}/>);
    const submitBtn = screen.getByText(/submit/i);
    fireEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
})