

export const deleteBook = (id) => {
  return (dispatch) => {
    dispatch({type: 'DELETE_ONE_BOOK', payload: id});
  }
}

export const addBook = ({bookAuthor, bookTitle}) => {
  return (dispatch) => {
    dispatch({type: 'ADD_ONE_BOOK', payload: {title: bookTitle, author: bookAuthor}});
  }
}