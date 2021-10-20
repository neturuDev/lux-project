import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import BooksList from '../components/BooksList';
import BookForm from '../components/BookForm';
import Button from '../components/Button';
import { useForm  } from '../hooks/useForm';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BooksPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'LOAD_BOOKS'});
  }, [dispatch]);

  const [formIsOpen, closeFormHandler, openFormHandler] = useForm();
  
  const booksList = useSelector(state => state.books) || [];

  const query = useQuery();
  const currentAuthor = query.get("author");
  const filteredBooksList = currentAuthor ? booksList.filter(book => book.author === currentAuthor) : booksList;


  return (
    <div className="grid-container">
      <div className="text-center">
        <Button text='Add new book' onButtonClick={openFormHandler} classNames=' primary'/>
      </div>
      {filteredBooksList.length > 0 && <BooksList booksList={filteredBooksList} />}
      {formIsOpen && <BookForm closeForm={closeFormHandler}/>}
    </div>
  )
}

export default BooksPage;