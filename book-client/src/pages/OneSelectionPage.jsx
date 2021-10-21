import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import OneSelection from '../components/OneSelection'
import { fetchSelections } from '../store/actions';


const OneSelectionPage = () => {
  const dispatch = useDispatch();
  const selectionId = useParams().selectionId;

  const selections = useSelector(state => state.selections);


  useEffect(() => {
    if (selections.length < 1) {
      dispatch(fetchSelections());
    }
  }, [dispatch, selections]);

  
  const oneSelection = selections.find((item) => item._id === selectionId);


  return (<>

    {!!oneSelection &&
        <OneSelection  
        author={oneSelection.author} 
        title={oneSelection.title} 
        email={oneSelection.email} 
        selectionId={oneSelection._id} 
        date={oneSelection.date} 
        books={oneSelection.books}
      />}
  </>);
}

export default OneSelectionPage;