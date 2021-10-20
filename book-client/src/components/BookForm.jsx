import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Modal from './Modal';



const BookForm = ({defaultTitle='', defaultAuthor='', onSubmit, onOpen, onClose, isOpen}) => {
  const [bookTitle, setBookTitle] = useState(defaultTitle);
  const [bookAuthor, setBookAuthor] = useState(defaultAuthor);

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  }
  const handleAuthorChange = (e) => {
    setBookAuthor(e.target.value);
  }

  const handleSubmit = () => {
    onSubmit(bookTitle, bookAuthor);
  }

  return(<>
    <Modal open={isOpen} handleClose={onClose} handleSubmit={handleSubmit} heading='Book'>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        type="text"
        fullWidth
        variant="standard"
        value={bookTitle}
        onChange={handleTitleChange}
      />
      <TextField
        margin="dense"
        id="author"
        label="Author"
        type="text"
        fullWidth
        variant="standard"
        value={bookAuthor}
        onChange={handleAuthorChange}
      />

    </Modal>
    
  </>)
}

export default BookForm;