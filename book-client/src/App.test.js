import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import reducer from './store/reducers';
import { createStore } from 'redux';

// const renderWithRedux = (
//   component,
//   {initialState, store = createStore(reducer, initialState) } = {}
// ) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store,
//   }
// }


function renderWithRedux(ui, { initialState, store = createStore(reducer, initialState) } = {}, renderFn = render) {
  const obj = {
    ...renderFn(<Provider store={store}>{ui}</Provider>),
    store,
  };
  obj.rerenderWithRedux = (el) => renderWithRedux(el, { store }, obj.rerender);
  return obj;
}

describe('Add new book integration test', () => {

  it('add new book', async () => {
    const {rerenderWithRedux} = renderWithRedux(<App />);
    const addBookBtn = screen.getByText(/add new book/i);
    expect(addBookBtn).toBeInTheDocument();

    fireEvent.click(addBookBtn);
    const formHeadingElement = screen.getByText('Book');
    expect(formHeadingElement).toBeInTheDocument();

    const titleInput = screen.getByLabelText('Title');
    const authorInput = screen.getByLabelText('Author');
    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')
    fireEvent.change(titleInput, {target: {value: 'The test book'}})
    fireEvent.change(authorInput, {target: {value: 'The test author'}})
    expect(titleInput.value).toBe('The test book')
    expect(authorInput.value).toBe('The test author')

    const submitBtn = screen.getByText(/submit/i);
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);

    const formHeadingElement2 = screen.queryByText('Book');
    expect(formHeadingElement2).not.toBeInTheDocument();


  });
});