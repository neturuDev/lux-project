import { mergeMap, map } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { setBooks, setOneBook, setSelections, deleteOneBook, removeOneBook } from './actions';
import { deleteBook, deleteBookTwo } from './api';



const ajaxGet = (url = null, actionFunc) => {
  return ajax.getJSON(`http://localhost:7000/${url}`).pipe(
    map(response => actionFunc(response))
  )
}



// export const deleteBookEpic = action$ => action$.pipe(
//   ofType('REMOVE_ONE_BOOK'),
//   mergeMap(action =>
//     deleteBookTwo(action).pipe(
//       ajaxGet('books', setBooks)
//     )
//   )
// );

export const fetchBooksEpic = action$ => action$.pipe(
  ofType('FETCH_BOOKS'),
  // mergeMap(action =>
  //   ajax.getJSON(`http://localhost:7000/books`).pipe(
  //     map(response => setBooks(response))
  //   )
  // )
  mergeMap(action =>
    ajaxGet('books', setBooks)
  )
);

export const fetchOneBookEpic = action$ => action$.pipe(
  ofType('FETCH_ONE_BOOK'),
  // mergeMap(action =>
  //   ajax.getJSON(`http://localhost:7000/books/${action.payload}`).pipe(
  //     map(response => setOneBook(response))
  //   )
  // )
  mergeMap(action =>
    ajaxGet(`books/${action.payload}`, setOneBook)
  )
);

export const fetchSelectionsEpic = action$ => action$.pipe(
  ofType('FETCH_SELECTIONS'),
  mergeMap(action =>
    // ajax.getJSON(`http://localhost:7000/selections`).pipe(
    //   map(response => setSelections(response))
    // )
    ajaxGet('selections', setSelections)
  )
);

const rootEpic = combineEpics(
  fetchBooksEpic,
  fetchOneBookEpic,
  fetchSelectionsEpic,
  // deleteBookEpic
);

export default rootEpic;