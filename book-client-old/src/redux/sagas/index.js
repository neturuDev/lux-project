import { take, put, call, spawn } from 'redux-saga/effects';

async function getBooks() {
  const request = await fetch('http://localhost:7000/books');
  const data = await request.json();
  return data;
}
async function getOneBook(bookId) {
  const request = await fetch('http://localhost:7000/books/' + bookId);
  const data = await request.json();
  return data;
}

async function deleteBook(bookId) {
  await fetch('http://localhost:7000/books/' + bookId, 
    {
      method: 'DELETE'
    }
  );
}

async function addBook(book) {
  await fetch('http://localhost:7000/books', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    }
  );
}

async function editBook(book) {

  const {bookId, title, author} = book;
  await fetch(`http://localhost:7000/books?id=${bookId}`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author,
        title
      })
    }
  );
}

export function* getBooksSaga() {
  const data = yield call(getBooks);
  yield put({type: 'SET_BOOKS', payload: data})
}
export function* getOneBookSaga(bookId) {
  if (bookId) {
    const data = yield call(getOneBook, bookId);
    yield put({type: 'SET_CURRENT_BOOK', payload: data})
  } else {
    yield put({type: 'SET_CURRENT_BOOK', payload: {}})
  }
}

export function* addBookSaga(book) {
  yield call(addBook, book);
  yield getBooksSaga();
}

export function* editBookSaga(book) {
  yield call(editBook, book);
}

export function* deleteBookSaga(bookId) {
  yield call(deleteBook, bookId);
  yield getBooksSaga();
}


export function* watchBooksSaga() {
  yield take('LOAD_BOOKS');
  yield getBooksSaga();
}
export function* watchOneBookSaga() {
  while (true) {
    const action = yield take('LOAD_ONE_BOOK');
    yield getOneBookSaga(action.payload);
    yield take('CLEAR_ONE_BOOK');
    yield getOneBookSaga(false);
  }
}

export function* watchDeleteBookSaga() {
  while (true) {
    const action = yield take('DELETE_ONE_BOOK');
    yield deleteBookSaga(action.payload);
  }
}

export function* watchAddBookSaga() {
  while (true) {
    const action = yield take('ADD_ONE_BOOK');
    yield addBookSaga(action.payload);
  }
}

export function* watchEditBookSaga() {
  while (true) {
    const action = yield take('EDIT_ONE_BOOK');
    yield editBookSaga(action.payload);
    yield getOneBookSaga(action.payload.bookId);
    yield getBooksSaga();
  }
}


export default function* rootSaga() {
  yield spawn(watchBooksSaga);
  yield spawn(watchOneBookSaga);
  yield spawn(watchDeleteBookSaga);
  yield spawn(watchAddBookSaga);
  yield spawn(watchEditBookSaga);
}