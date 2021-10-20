import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Paper } from '@mui/material';
import { fetchSelections } from '../store/actions';
import SelectionsList from '../components/SelectionsList';


const SelectionsPage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchSelections());
  }, [dispatch]);

  const selectionsList = useSelector(state => state.selections) || [];

  return (<>
  <Paper sx={{ p: 1, margin: 'auto', flexGrow: 1 }} elevation={0} square>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item><h1>Selections list</h1></Grid>
        <Grid item>
          <Button color="primary" variant="outlined">
            Add new selection
          </Button>
        </Grid>
      </Grid>
    </Paper>
    <SelectionsList selections={selectionsList} />
  </>)
}

export default SelectionsPage;