const initial = {
  books: [],
  currentBook: {},
  selections: [],
  currentSelection: {}
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
    case 'REMOVE_ONE_BOOK': {
      return {
        ...state,
        books: state.books.filter(book => book._id !== action.payload)
      }
    }
    case 'SET_ONE_BOOK': {
      return {
        ...state,
        currentBook: action.payload
      }
    }

    case 'SET_SELECTIONS': {
      return {
        ...state,
        selections: [
          ...action.payload
        ]
      }
    }
    
    default: return state;
  }

}