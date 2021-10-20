import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { addBook } from '../redux/actions';


const BookSchema = Yup.object().shape({
  bookTitle: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  bookAuthor: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const CustomInputComponent = ({
  labelName,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <label>{labelName}
      <input type="text" {...field} {...props} />
    </label>
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

const BookForm = ({closeForm, bookId='', defaultTitle='', defaultAuthor=''}) => {
  const dispatch = useDispatch();

  const phrase = bookId ? 'Edit' : 'Add';

  const handleBgClick = (e) => {
    e.stopPropagation();
    closeForm();
  }



  return(<>
  <div className="modal-wrapper">
    <div className="modal-bg" onClick={handleBgClick}></div>
    <div className="modal">
      <div onClick={closeForm} className="close-btn">X</div>
      <div className="text-center"><h4>{phrase} book</h4></div>

      <Formik
        initialValues={{
          bookTitle: defaultTitle,
          bookAuthor: defaultAuthor,
        }}
        validationSchema={BookSchema}
        onSubmit={({bookAuthor, bookTitle}) => {
         // same shape as initial values
          if (bookId) {
            dispatch({type: 'EDIT_ONE_BOOK', payload: { bookId, title: bookTitle, author: bookAuthor }});
          } else {
            const addOneBook = addBook({bookAuthor, bookTitle});
            addOneBook(dispatch);
            // dispatch({type: 'ADD_ONE_BOOK', payload: {title: bookTitle, author: bookAuthor}});
          }
          closeForm();
       }}
     >
       {({ errors, touched }) => (

      <Form>
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <Field name="bookTitle" component={CustomInputComponent} labelName='Book'/>
            </div>
            <div className="medium-6 cell">
              <Field name="bookAuthor" component={CustomInputComponent} labelName='Written by'/>       
            </div>
          </div>
          <button className="button primary expanded" type='submit'>{phrase}</button>
        </div>
      </Form>
      )}
     </Formik>
    </div>
  </div>
    
    
  </>)
}

export default BookForm;