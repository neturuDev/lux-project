import { render, screen, fireEvent } from '@testing-library/react';
import SelectionForm from './SelectionForm';

describe('Add selection form test', () => {
  it('form is not in document without isOpen parameter', async () => {
    render(<SelectionForm />);
    const headingElement = screen.queryByText('Selection');
    expect(headingElement).not.toBeInTheDocument();
  });

  it('form is open is in document with isOpen parameter', async () => {
    render(<SelectionForm isOpen />);
    const headingElement = screen.getByText('Selection');
    expect(headingElement).toBeInTheDocument();
  });

  it('form has inputs and its work', async () => {
    render(<SelectionForm isOpen />);
    const titleInput = screen.getByLabelText(/Title/i);
    const authorInput = screen.getByLabelText(/Author/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const dateInput = screen.getByLabelText(/Date/i);
    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();

    expect(titleInput.value).toBe('');
    expect(authorInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(dateInput.value).toBe('');

    fireEvent.change(titleInput, {target: {value: 'The first book'}})
    fireEvent.change(authorInput, {target: {value: 'Author'}})
    fireEvent.change(emailInput, {target: {value: 'email@email.com'}})
    fireEvent.change(dateInput, {target: {value: '2017-06-01T08:30'}})

    expect(titleInput.value).toBe('The first book')
    expect(authorInput.value).toBe('Author')
    expect(emailInput.value).toBe('email@email.com')
    expect(dateInput.value).toBe('2017-06-01T08:30')

    fireEvent.change(titleInput, {target: {value: ''}})
    fireEvent.change(authorInput, {target: {value: ''}})
    fireEvent.change(emailInput, {target: {value: ''}})
    fireEvent.change(dateInput, {target: {value: ''}})

    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(dateInput.value).toBe('')
  });

  it('default inputs values are work', async () => {
    render(<SelectionForm isOpen defaultTitle='defaultTitle' defaultAuthor='defaultAuthor' defaultEmail='defaultEmail' defaultDate='2017-06-01T08:30'/>);
    const titleInput = screen.getByLabelText(/Title/i);
    const authorInput = screen.getByLabelText(/Author/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const dateInput = screen.getByLabelText(/Date/i);

    expect(titleInput.value).toBe('defaultTitle');
    expect(authorInput.value).toBe('defaultAuthor');
    expect(emailInput.value).toBe('defaultEmail');
    expect(dateInput.value).toBe('2017-06-01T08:30');
  });

  it('close button works', async () => {
    const handleClose = jest.fn()
    render(<SelectionForm isOpen onClose={handleClose}/>);
    const closeBtn = screen.getByText(/cancel/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('submit button works', async () => {
    const handleSubmit = jest.fn()
    render(<SelectionForm isOpen onSubmit={handleSubmit}/>);
    const submitBtn = screen.getByText(/submit/i);
    fireEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});