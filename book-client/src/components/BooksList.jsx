import BooksListItem from './BooksListItem';
import Grid from '@mui/material/Grid';

const BooksList = ({booksList, isInSelection = false, selectionId}) => {

  return(<>
  <Grid container spacing={2}>
    {booksList.map((book) => {
      return(
        <Grid item xs={12} md={6} lg={4} key={book._id}>
          <BooksListItem isInList title={book.title} author={book.author} bookId={book._id} isInSelection={isInSelection} selectionId={selectionId}/>
        </Grid>
      )
    })}
  </Grid>
  </>)
}

export default BooksList;