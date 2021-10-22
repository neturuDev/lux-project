import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Modal from './Modal';

const BookToSelectionForm = ({books, onSubmit, onClose, isOpen}) => {

  const [chosenBook, setChosenBook] = useState('');

  const handleChange = (event) => {
    setChosenBook(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(chosenBook);
  }

  return(
    <Modal open={isOpen} handleClose={onClose} handleSubmit={handleSubmit} heading='Add book to selection'>
      {(books.length > 0) &&
        <FormControl fullWidth margin="dense">
          <InputLabel id="demo-simple-select-label">Book</InputLabel>
          <Select
            labelId="book"
            id="book"
            value={chosenBook}
            label="Book"
            onChange={handleChange}
          >
          {
            books.map((book) => <MenuItem value={book._id}>{book.author} - {book.title}</MenuItem>)
          }
            
          </Select>
        </FormControl>
      }
      {!(books.length > 0) &&
        <Typography variant="h5" component="div" color="error">All books are in selection</Typography>
      }
      
      
    </Modal>
  )
}

export default BookToSelectionForm;