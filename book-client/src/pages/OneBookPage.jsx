import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import BooksListItem from '../components/BooksListItem';
import { fetchOneBook } from '../store/actions';

const OneBookPage = () => {
  const dispatch = useDispatch();
  const bookId = useParams().bookId;

  useEffect(() => {
    dispatch(fetchOneBook(bookId));
  }, [dispatch]);

  const oneBook = useSelector(state => state.currentBook) || [];

  return <BooksListItem className="mt-4" title={oneBook.title} author={oneBook.author} bookId={oneBook._id}/>
}

export default OneBookPage;