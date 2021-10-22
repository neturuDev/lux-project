import { mergeMap, map } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { setBooks, setOneBook, setSelections } from './actions';



const ajaxGet = (url = null, actionFunc) => {
  return ajax.getJSON(`http://localhost:7000/${url}`).pipe(
    map(response => actionFunc(response))
  )
}


export const fetchBooksEpic = action$ => action$.pipe(
  ofType('FETCH_BOOKS'),
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
    ajaxGet('selections', setSelections)
  )
);

const rootEpic = combineEpics(
  fetchBooksEpic,
  fetchOneBookEpic,
  fetchSelectionsEpic
);

export default rootEpic;