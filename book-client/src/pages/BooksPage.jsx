import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BooksList from '../components/BooksList';
import { fetchBooks } from '../store/actions';
import { Button, Grid, Paper } from '@mui/material';
import BookForm from '../components/BookForm';
import { addBook } from '../store/api';

const BooksPage = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const openModalHandler = () => {
    setModalIsOpen(true);
  }
  const closeModalHandler = () => {
    setModalIsOpen(false);
  }

  const addBookHandler = (bookTitle, bookAuthor) => {
    const book = {title: bookTitle, author: bookAuthor};
    addBook(book);
    dispatch(fetchBooks());
    setModalIsOpen(false);
  }

  const booksList = useSelector(state => state.books) || [];

  return (<>
    <Paper sx={{ p: 1, margin: 'auto', flexGrow: 1 }} elevation={0} square>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item><h1>Books list</h1></Grid>
        <Grid item>
          <Button onClick={openModalHandler} color="primary" variant="outlined">
            Add new book
          </Button>
        </Grid>
      </Grid>
    </Paper>
    <BooksList booksList={booksList} />
    {modalIsOpen && 
      <BookForm 
        isOpen={modalIsOpen}
        onOpen={openModalHandler}
        onClose={closeModalHandler} 
        onSubmit={addBookHandler}/>}
  </>);
}

export default BooksPage;