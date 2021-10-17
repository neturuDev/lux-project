export async function deleteBook(bookId, errorHandler) {

    const response = await fetch(`http://localhost:7000/books/${bookId}`, 
      {
        method: 'DELETE'
      }
    );

    const result = await response.json();

    if(result.hasOwnProperty('err')) {
      errorHandler(result.err);
    } 

}

// export async function deleteBookTwo(action) {
//   try {
//     const request = await fetch(`http://localhost:7000/books/${action.payload}`, 
//       {
//         method: 'DELETE'
//       }
//     );
//     return action
//   } catch (error) {
//   }
// }


export async function addBook(book) {
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

export async function editBook(book) {

  const {bookId, bookTitle, bookAuthor} = book;
  await fetch(`http://localhost:7000/books?id=${bookId}`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: bookAuthor,
        title: bookTitle
      })
    }
  );
}