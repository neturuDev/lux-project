import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Paper } from '@mui/material';
import { fetchSelections } from '../store/actions';
import SelectionsList from '../components/SelectionsList';
import SelectionForm from '../components/SelectionForm';
import { addSelection } from '../store/api';


const SelectionsPage = () => {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  useEffect(() => {
    dispatch(fetchSelections());
  }, [dispatch]);

  const openModalHandler = () => {
    setModalIsOpen(true);
  }
  const closeModalHandler = () => {
    setModalIsOpen(false);
  }

  const addSelectionHandler = (author, title, email, date) => {
    addSelection({author, title, email, date});
    dispatch(fetchSelections());
    setModalIsOpen(false);
  }

  const selectionsList = useSelector(state => state.selections) || [];

  return (<>
  <Paper sx={{ p: 1, margin: 'auto', flexGrow: 1 }} elevation={0} square>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item><h1>Selections list</h1></Grid>
        <Grid item>
          <Button onClick={openModalHandler} color="primary" variant="outlined">
            Add new selection
          </Button>
        </Grid>
      </Grid>
    </Paper>
    <SelectionsList selections={selectionsList} />
    {modalIsOpen && 
      <SelectionForm 
        isOpen={modalIsOpen}
        onOpen={openModalHandler}
        onClose={closeModalHandler} 
        onSubmit={addSelectionHandler}/>}
  </>)
}

export default SelectionsPage;