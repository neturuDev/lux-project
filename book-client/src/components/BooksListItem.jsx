import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { deleteOneBook, updateOneBook } from '../store/dispatchers';
import BookForm from './BookForm';
import ErrorModal from './ErrorModal';
import { removeOneBook } from '../store/actions';

const BooksListItem = ({title, author, bookId, className, isInList = false}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteBookError, setDeleteBookError] = useState(null);

  const openModalHandler = () => {
    setModalIsOpen(true);
  }
  const closeModalHandler = () => {
    setModalIsOpen(false);
  }

  const deleteBookErrorHandler = (error) => {
    if (error.length > 0) setDeleteBookError(error);
  }

  const closeErrorModalHandler = () => {
    setDeleteBookError(null);
  }

  const deleteBookHandler = () => {
    const deleteBook = deleteOneBook(bookId, deleteBookErrorHandler);
    deleteBook(dispatch);
    history.push("/books");
    // dispatch(removeOneBook(bookId));
  }

  const editBookHandler = (bookTitle, bookAuthor) => {
    const book = {bookId, bookTitle, bookAuthor};
    const updateBook = updateOneBook(book, isInList);
    updateBook(dispatch);
    setModalIsOpen(false);
  }

  return (<>
    <Card variant="outlined" className={className}>
      <Link className="bookListItemLink" to={`/books/${bookId}`}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Author: {author}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button onClick={deleteBookHandler} color="error">
          Delete book
        </Button>
        <Button onClick={openModalHandler} color="primary">
          Edit book
        </Button>
      </CardActions>
    </Card>
    {modalIsOpen && 
      <BookForm 
        isOpen={modalIsOpen}
        onOpen={openModalHandler}
        onClose={closeModalHandler}
        defaultTitle={title} 
        defaultAuthor={author} 
        onSubmit={editBookHandler}/>}
    {deleteBookError && 
      <ErrorModal 
        open={!!deleteBookError} 
        handleClose={closeErrorModalHandler}
        >{deleteBookError}
      </ErrorModal>}
  </>);
}

export default BooksListItem;