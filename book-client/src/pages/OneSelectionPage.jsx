import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Paper } from '@mui/material';
import OneSelection from '../components/OneSelection'
import { fetchSelections, fetchBooks } from '../store/actions';
import BooksList from '../components/BooksList';
import BookToSelectionForm from '../components/BookToSelectionForm';
import { addBookToSelection } from '../store/api';


const OneSelectionPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const selectionId = useParams().selectionId;

  const selections = useSelector(state => state.selections);
  const allBooks = useSelector(state => state.books);


  useEffect(() => {
    if (selections.length < 1) {
      dispatch(fetchSelections());
    }
  }, [dispatch, selections]);

  useEffect(() => {
    if (allBooks.length < 1) {
      dispatch(fetchBooks());
    }
  }, [dispatch, allBooks]);

  
  const oneSelection = selections.find((item) => item._id === selectionId);
  const booksIdInSelection = oneSelection?.books;
  // const allBooksIds = 

  let booksInSelection;
  let booksIdOutOfSelection;
  if(!!allBooks && !!booksIdInSelection && (allBooks.length > 0) && (booksIdInSelection.length > 0)){
    booksInSelection = booksIdInSelection.map((bookIds) => allBooks.find((book) => book._id === bookIds[0]));
    booksIdOutOfSelection = allBooks.filter((book) => !(booksIdInSelection.flat().includes(book._id)));
  }
  

  const openModalHandler = () => {
    setModalIsOpen(true);
  }
  const closeModalHandler = () => {
    setModalIsOpen(false);
  }
  const addBookHandler = (bookId) => {
    addBookToSelection(selectionId, bookId);
    dispatch(fetchSelections());
    setModalIsOpen(false);
  }


  return (<>
    

    {!!oneSelection &&
        <OneSelection  
          author={oneSelection.author} 
          title={oneSelection.title} 
          email={oneSelection.email} 
          date={oneSelection.date} 
        />}
      <hr />
        
        <Paper sx={{ p: 1, margin: 'auto', flexGrow: 1 }} elevation={0} square>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item><h2>Books in selection</h2></Grid>
            <Grid item>
              <Button onClick={openModalHandler} color="primary" variant="outlined">
                Add book to selection
              </Button>
            </Grid>
          </Grid>
        </Paper>
      {booksInSelection && (booksInSelection.length > 0) && 
        <BooksList booksList={booksInSelection} selectionId={oneSelection._id} isInSelection/>
      }

      {modalIsOpen && 
        <BookToSelectionForm 
          books={booksIdOutOfSelection}
          onSubmit={addBookHandler}
          onClose={closeModalHandler}
          isOpen={modalIsOpen}
        />}
  </>);
}

export default OneSelectionPage;