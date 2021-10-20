import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookForm from '../components/BookForm';
import { useForm  } from '../hooks/useForm';
import Button from '../components/Button';

const SingleBookPage = () => {
  const dispatch = useDispatch();
  const bookId = useParams().bookId;

  useEffect(() => {
    dispatch({type: 'LOAD_ONE_BOOK', payload: bookId});
    return () => {
      dispatch({type: 'CLEAR_ONE_BOOK'});
    }
  }, [dispatch, bookId]);

  const book = useSelector(state => state.currentBook) || [];

  const [formIsOpen, closeFormHandler, openFormHandler] = useForm();

  return (
    <div className="grid-container">
      <div className="text-center">
        <h1>{book.title}</h1>
        <p>Author: {book.author}</p>
        <Button text='Edit book' onButtonClick={openFormHandler} classNames=' primary'/>
      </div>
      {formIsOpen && <BookForm closeForm={closeFormHandler} bookId={bookId} defaultTitle={book.title} defaultAuthor={book.author}/>}
    </div>
  )
}

export default SingleBookPage;