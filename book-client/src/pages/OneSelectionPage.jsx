import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import OneSelection from '../components/OneSelection'
import { fetchSelections, fetchBooks } from '../store/actions';
import BooksList from '../components/BooksList';


const OneSelectionPage = () => {
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

  let booksInSelection;

  if(!!allBooks && !!booksIdInSelection && (allBooks.length > 0) && (booksIdInSelection.length > 0)){
    booksInSelection = booksIdInSelection.map((bookIds) => allBooks.find((book) => book._id === bookIds[0]))
  }
  

  


  return (<>

    {!!oneSelection &&
        <OneSelection  
        author={oneSelection.author} 
        title={oneSelection.title} 
        email={oneSelection.email} 
        date={oneSelection.date} 
      />}
    {booksInSelection && (booksInSelection.length > 0) && 
      (<>
        <hr />
        <h2>Books in selection</h2>
        <BooksList booksList={booksInSelection} selectionId={oneSelection._id} isInSelection/>
      </>)
    }
  </>);
}

export default OneSelectionPage;