export const fetchBooks = () => ({ type: 'FETCH_BOOKS' });
export const setBooks = payload => ({ type: 'SET_BOOKS', payload });
export const fetchOneBook = bookId => ({ type: 'FETCH_ONE_BOOK', payload: bookId });
export const setOneBook = payload => ({ type: 'SET_ONE_BOOK', payload });

// export const removeOneBook = bookId => ({ type: 'REMOVE_ONE_BOOK', payload: bookId });


export const fetchSelections = () => ({ type: 'FETCH_SELECTIONS' });
export const setSelections = payload => ({ type: 'SET_SELECTIONS', payload });