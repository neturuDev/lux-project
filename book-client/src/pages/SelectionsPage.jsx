import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelections } from '../store/actions';
import SelectionsList from '../components/SelectionsList';

const SelectionsPage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchSelections());
  }, [dispatch]);

  const selectionsList = useSelector(state => state.selections) || [];

  return <SelectionsList selections={selectionsList} />
}

export default SelectionsPage;