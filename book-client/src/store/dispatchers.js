import { fetchBooks, fetchOneBook, fetchSelections, fetchOneSelection } from './actions';
import { deleteBook, editBook, deleteSelection, editSelection, deleteBookFromSelection } from './api'

export const deleteOneBook = (bookId, errorHandler) => {
  deleteBook(bookId, errorHandler);
  return (dispatch) => {
    dispatch(fetchBooks());
  }
}

export const deleteOneSelection = (selectionId, errorHandler) => {
  deleteSelection(selectionId, errorHandler);
  return (dispatch) => {
    dispatch(fetchSelections());
  }
}

export const removeBookFromSelection = (selectionId, bookId) => {
  deleteBookFromSelection(selectionId, bookId);
  return (dispatch) => {
    dispatch(fetchSelections());
  }
}


export const updateOneBook = (book, isInList) => {
  editBook(book);
  return isInList ? (dispatch) => {dispatch(fetchBooks())} : (dispatch) => {dispatch(fetchOneBook(book.bookId))}
}

export const updateOneSelection = (selection) => {
  console.log('Edit selection run')
  editSelection(selection);
  return (dispatch) => {dispatch(fetchSelections())};
}

