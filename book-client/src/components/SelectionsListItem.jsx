import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ErrorModal from './ErrorModal';
import { deleteOneSelection } from '../store/dispatchers';

const SelectionsListItem = ({author, title, email, id, books}) => {
  const dispatch = useDispatch();
  const [deleteSelectionError, setDeleteSelectionError] = useState(null);

  const deleteSelectionErrorHandler = (error) => {
    if (error.length > 0) setDeleteSelectionError(error);
  }

  const closeErrorModalHandler = () => {
    setDeleteSelectionError(null);
  }

  const deleteSelectionHandler = () => {
    const deleteSelection = deleteOneSelection(id, deleteSelectionErrorHandler);
    deleteSelection(dispatch);
  }

  return (<>
    <Card variant="outlined">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Author: {author}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Email: {email}
          </Typography>
    
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={deleteSelectionHandler}>
          Delete selection
        </Button>
      </CardActions>
    </Card>
    {deleteSelectionError && 
      <ErrorModal 
        open={!!deleteSelectionError} 
        handleClose={closeErrorModalHandler}
        >{deleteSelectionError}
      </ErrorModal>}
  </>);
}

export default SelectionsListItem;