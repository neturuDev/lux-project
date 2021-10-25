import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import BookToSelectionForm from './BookToSelectionForm.jsx';


const TEST_BOOKS = [
  {_id: 'id1', author: 'test author 1', title: 'test title 1'},
  {_id: 'id2', author: 'test author 2', title: 'test title 2'}
]

describe('Add book to selection form test', () => {
  
  it('form is not in document without isOpen parameter', async () => {
    render(<BookToSelectionForm />);
    const headingElement = screen.queryByText('Add book to selection');
    expect(headingElement).not.toBeInTheDocument();
  });

  it('form is open is in document with isOpen parameter', async () => {
    render(<BookToSelectionForm isOpen />);
    const headingElement = screen.getByText('Add book to selection');
    expect(headingElement).toBeInTheDocument();
  });

  it('a warning is shown without books parameter', async () => {
    render(<BookToSelectionForm isOpen />);
    const warningElement = screen.getByText(/All books are in selection/i);
    expect(warningElement).toBeInTheDocument();
  });

  it('a warning is not shown with books parameter', async () => {
    render(<BookToSelectionForm isOpen books={TEST_BOOKS} />);
    const warningElement = screen.queryByText(/All books are in selection/i);
    expect(warningElement).not.toBeInTheDocument();
  });

  it('close button works', async () => {
    const handleClose = jest.fn()
    render(<BookToSelectionForm isOpen onClose={handleClose}/>);
    const closeBtn = screen.getByText(/cancel/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('submit button works', async () => {
    const handleSubmit = jest.fn()
    render(<BookToSelectionForm isOpen onSubmit={handleSubmit}/>);
    const submitBtn = screen.getByText(/submit/i);
    fireEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
})