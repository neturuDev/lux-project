import { useState } from 'react';
import TextField from '@mui/material/TextField';


import Modal from './Modal';

const SelectionForm = ({
  defaultTitle='', 
  defaultAuthor='', 
  defaultEmail='', 
  defaultDate='',
  isOpen = false,
  onClose,
  onSubmit
}) => {
  const [selectionTitle, setSelectionTitle] = useState(defaultTitle);
  const [selectionAuthor, setSelectionAuthor] = useState(defaultAuthor);
  const [authorEmail, setAuthorEmail] = useState(defaultEmail);
  const [selectionDate, setSelectionDate] = useState(defaultDate);

  const handleTitleChange = (e) => {
    setSelectionTitle(e.target.value);
  }
  const handleAuthorChange = (e) => {
    setSelectionAuthor(e.target.value);
  }
  const handleEmailChange = (e) => {
    setAuthorEmail(e.target.value);
  }
  const handleDateChange = (e) => {
    setSelectionDate(e.target.value);
  }

  const handleSubmit = () => {
    onSubmit(selectionTitle, selectionAuthor, authorEmail, selectionDate);
  }

  return(<>
    <Modal open={isOpen} handleClose={onClose} handleSubmit={handleSubmit} heading='Selection'>
      <TextField
        autoFocus
        required
        margin="dense"
        id="title"
        label="Title"
        type="text"
        fullWidth
        variant="standard"
        value={selectionTitle}
        onChange={handleTitleChange}
        variant="outlined"
        InputLabelProps={{
            shrink: true,
          }}
      />
      <TextField
        required
        margin="dense"
        id="author"
        label="Author"
        type="text"
        fullWidth
        variant="standard"
        value={selectionAuthor}
        onChange={handleAuthorChange}
        variant="outlined"
        InputLabelProps={{
            shrink: true,
          }}
      />
      <TextField
        required
        margin="dense"
        id="email"
        label="Email"
        type="email"
        fullWidth
        variant="standard"
        value={authorEmail}
        onChange={handleEmailChange}
        variant="outlined"
        InputLabelProps={{
            shrink: true,
          }}
      />
      <TextField
        required
        margin="dense"
        id="datetime-local"
        label="Date"
        type="datetime-local"
        defaultValue={selectionDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Modal>
  </>)

}

export default SelectionForm;