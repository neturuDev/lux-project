import { render, screen, fireEvent } from '@testing-library/react';
import BooksList from './BooksList';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import reducer from '../store/reducers';
import { createStore } from 'redux';

const renderWithRedux = (
  component,
  {initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

const testBooksList = [{_id: 'book id', author: 'Book author', title: 'Book title'}];

describe('Books list test', () => {

  it('Books list is rendered', async () => {
    renderWithRedux(<Router><BooksList booksList={testBooksList}/></Router>);
    const bookAuthorElement = screen.getByText(/Book author/i);
    const bookTitleElement = screen.getByText(/Book title/i);
    expect(bookAuthorElement).toBeInTheDocument();
    expect(bookTitleElement).toBeInTheDocument();
  });

});
