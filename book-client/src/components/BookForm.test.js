import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm'

describe('Add book form test', () => {
  
  it('form is not in document without isOpen parameter', async () => {
    render(<BookForm />);
    const headingElement = screen.queryByText('Book');
    expect(headingElement).not.toBeInTheDocument();
  });

  it('form is open is in document with isOpen parameter', async () => {
    render(<BookForm isOpen />);
    const headingElement = screen.getByText('Book');
    expect(headingElement).toBeInTheDocument();
  });

  it('form has inputs and its work', async () => {
    render(<BookForm isOpen />);
    const titleInput = screen.getByLabelText('Title');
    const authorInput = screen.getByLabelText('Author');
    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();

    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')

    fireEvent.change(titleInput, {target: {value: 'The first book'}})
    fireEvent.change(authorInput, {target: {value: 'Author'}})

    expect(titleInput.value).toBe('The first book')
    expect(authorInput.value).toBe('Author')

    fireEvent.change(titleInput, {target: {value: ''}})
    fireEvent.change(authorInput, {target: {value: ''}})

    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')

  });

  it('default inputs values are work', async () => {
    render(<BookForm isOpen defaultTitle='defaultTitle' defaultAuthor='defaultAuthor'/>);
    const titleInput = screen.getByLabelText('Title');
    const authorInput = screen.getByLabelText('Author');
    expect(titleInput.value).toBe('defaultTitle');
    expect(authorInput.value).toBe('defaultAuthor');
  });

  it('close button works', async () => {
    const handleClose = jest.fn()
    render(<BookForm isOpen onClose={handleClose}/>);
    const closeBtn = screen.getByText(/cancel/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('submit button works', async () => {
    const handleSubmit = jest.fn()
    render(<BookForm isOpen onSubmit={handleSubmit}/>);
    const submitBtn = screen.getByText(/submit/i);
    fireEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
})

