import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ErrorModal from './ErrorModal';
import { deleteOneSelection, updateOneSelection } from '../store/dispatchers';
import SelectionForm from './SelectionForm';


const SelectionsListItem = ({author, title, email, selectionId, date}) => {
  const dispatch = useDispatch();
  const [deleteSelectionError, setDeleteSelectionError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalHandler = () => {
    setModalIsOpen(true);
  }
  const closeModalHandler = () => {
    setModalIsOpen(false);
  }

  const deleteSelectionErrorHandler = (error) => {
    if (error.length > 0) setDeleteSelectionError(error);
  }

  const closeErrorModalHandler = () => {
    setDeleteSelectionError(null);
  }

  const deleteSelectionHandler = () => {
    const deleteSelection = deleteOneSelection(selectionId, deleteSelectionErrorHandler);
    deleteSelection(dispatch);
  }

  const editSelectionHandler = (selectionTitle, selectionAuthor, authorEmail, selectionDate) => {
    const selection = {selectionId, selectionTitle, selectionAuthor, authorEmail, selectionDate};
    const updateSelection = updateOneSelection(selection);
    updateSelection(dispatch);
    setModalIsOpen(false);
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
        <Button color="error" onClick={deleteSelectionHandler}>
          Delete selection
        </Button>
        <Button onClick={openModalHandler} color="primary">
          Edit selection
        </Button>
      </CardActions>
    </Card>
    {modalIsOpen && 
      <SelectionForm 
        defaultTitle={title}
        defaultAuthor={author}
        defaultEmail={email}
        defaultDate={date}
        isOpen={modalIsOpen}
        onClose={closeModalHandler} 
        onSubmit={editSelectionHandler}/>}
    {deleteSelectionError && 
      <ErrorModal 
        open={!!deleteSelectionError} 
        handleClose={closeErrorModalHandler}
        >{deleteSelectionError}
      </ErrorModal>}
  </>);
}

export default SelectionsListItem;