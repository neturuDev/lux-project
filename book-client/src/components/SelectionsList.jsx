import { useDispatch } from 'react-redux';
import SelectionsListItem from './SelectionsListItem';
import Grid from '@mui/material/Grid';

const SelectionsList = ({selections}) => {
  return(<>
    <Grid container spacing={2}>
      {selections.map((selection) => {
        return(
          <Grid item xs={12} md={6} lg={4} key={selection._id}>
            <SelectionsListItem title={selection.title} author={selection.author} id={selection._id} email={selection.email} date={selection.date}/>
          </Grid>
        )
      })}
    </Grid>
  </>)
}

export default SelectionsList;