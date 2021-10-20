import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Button from './Button';
import { deleteBook } from '../redux/actions';

const BooksList = ({booksList}) => {
  const dispatch = useDispatch();
  const deleteBookHandler = (id) => {
    const deleteCurrentBook = deleteBook(id);
    deleteCurrentBook(dispatch);
  }

  return(<>
  <div className="grid-container">
    <div className="text-center"><h1>Books list</h1></div>
  </div>
  <div data-testid="books-list" className="books-list grid-margin-x grid-margin-y grid-x small-up-1 medium-up-2 large-up-4 align-center">
    {booksList.map((book) => {
      return(
        <div className="cell" key={book._id}>
          <div className="card">
            <div className="card-divider">
              <h4>{book.title}</h4>
            </div>
            <div className="card-section">
              <p>Author: {book.author}</p>
              <Link to={book._id} className="button success expanded">Book detail</Link>
              <Button text="delete book" classNames=' alert' onButtonClick={deleteBookHandler.bind(null, book._id)}/>
            </div>
          </div>
        </div>
      )
    })}
  </div>
  </>)
}

export default BooksList;