import { render, screen } from '@testing-library/react';
import BooksListItem from './BooksListItem';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../store/reducers';
import { BrowserRouter as Router } from "react-router-dom";


const renderWithRedux = (
  component,
  {initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe('Books list item test', () => {

  it('Books list item is rendered', async () => {
    renderWithRedux(<Router><BooksListItem title="Test title" author="Test Author" bookId="bookId"/></Router>);
    const bookAuthorElement = screen.getByText(/Test Author/i);
    const bookTitleElement = screen.getByText(/Test title/i);
    expect(bookAuthorElement).toBeInTheDocument();
    expect(bookTitleElement).toBeInTheDocument();
  });

});


