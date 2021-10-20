import React from 'react'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store' //ES6 modules


import reducer from './redux/reducers'
import { addBook, deleteBook } from './redux/actions';

const middlewares = [];
const mockStore = configureStore(middlewares);

// const addTodo = () => ({ type: 'LOAD_BOOKS' })

const initial = {
  books: [
    {author:'Pushkin', title:'Eugene Onegin', _id:'DBHxziigSiIQsAGY'}
  ]
}

const renderWithRedux = (
  component,
  {initialState = initial, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

import App from './App';



describe('integration', () => {
  it('books list is in document', async () => {
    renderWithRedux(<App />);
    expect(await screen.findByText(/Books list/i)).toBeInTheDocument();
  });

  it('add book', async () => {
    renderWithRedux(<App />);
    screen.debug();
    
    const addBookBtn = await screen.findByText('Add new book');
    fireEvent.click(addBookBtn);
    const formHeadingNode = await screen.findByText('Add book');
    expect(formHeadingNode).toBeInTheDocument();

    const inputBookNode = await screen.findByLabelText('Book');
    const inputAuthorNode = await screen.findByLabelText('Written by');
    expect(inputBookNode).toBeInTheDocument();
    expect(inputAuthorNode).toBeInTheDocument();

    userEvent.type(inputBookNode, "The first book");
    userEvent.type(inputAuthorNode, "Author");  
    
    const submitFormBtn = await screen.findByText('Add');

    fireEvent.click(submitFormBtn)
    


    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

     // Dispatch the action
    const addOneBook = addBook({bookAuthor: 'Author', bookTitle:'The first book'});
    addOneBook(store.dispatch);

    // Test if your store dispatched the expected actions
    const actions = store.getActions()
    const expectedPayload = {type: 'ADD_ONE_BOOK', payload: {author: 'Author', title: 'The first book'}}
    expect(actions).toEqual([expectedPayload])
    
    //const newBook = await screen.findAllByText("The first book");
    // expect(newBook).toBeInTheDocument();
  })

  it('should dispatch delete book action', () => {

    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)
  
    // Dispatch the action
    const deleteCurrentBook = deleteBook('123');
    deleteCurrentBook(store.dispatch);
  
    // Test if your store dispatched the expected actions
    const actions = store.getActions()
    const expectedPayload = { type: 'DELETE_ONE_BOOK', payload: '123' }
    expect(actions).toEqual([expectedPayload])
  })

})

