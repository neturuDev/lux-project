import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import BooksListItem from './BooksListItem';
import Grid from '@mui/material/Grid';
// import { deleteBook } from '../redux/actions';

const BooksList = ({booksList}) => {
  const dispatch = useDispatch();
  const deleteBookHandler = (id) => {
    // const deleteCurrentBook = deleteBook(id);
    // deleteCurrentBook(dispatch);
  }

  return(<>
  <Grid container spacing={2}>
    {booksList.map((book) => {
      return(
        <Grid item xs={12} md={6} lg={4} key={book._id}>
          <BooksListItem isInList title={book.title} author={book.author} bookId={book._id}/>
        </Grid>
      )
    })}
  </Grid>
  </>)
}

export default BooksList;