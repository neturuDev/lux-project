
const initial = {
  books: [],
  currentBook: {},
}
export default function reducer(state = initial, action) {
  switch (action.type) {
    case 'SET_BOOKS': {
      return {
        ...state,
        books: [
          ...action.payload
        ]
      }
    }
    case 'SET_CURRENT_BOOK': {
      return {
        ...state,
        currentBook: action.payload
      }
    }
    default: return state;
  }

}