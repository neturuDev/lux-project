import { useState } from 'react';

const useForm = () => {

  const [formIsOpen, setFormIsOpen] = useState(false);

  const closeFormHandler = () => {
    setFormIsOpen(false);
  }
  const openFormHandler = () => {
    setFormIsOpen(true);
  }

  return [
    formIsOpen,
    closeFormHandler,
    openFormHandler
  ]
} 


export { useForm };