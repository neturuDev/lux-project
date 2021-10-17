import { fetchBooks, fetchOneBook } from './actions';
import { deleteBook, editBook } from './api'

export const deleteOneBook = (bookId, errorHandler) => {
  deleteBook(bookId, errorHandler);
  return (dispatch) => {
    dispatch(fetchBooks());
  }
}

export const updateOneBook = (book, isInList) => {
  editBook(book);
  return isInList ? (dispatch) => {dispatch(fetchBooks())} : (dispatch) => {dispatch(fetchOneBook(book.bookId))}
}

