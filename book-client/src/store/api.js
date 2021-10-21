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

export async function deleteSelection(selectionId, errorHandler) {
  const response = await fetch(`http://localhost:7000/selections/${selectionId}`, 
    {
      method: 'DELETE'
    }
  );
  const result = await response.json();
  if(result.hasOwnProperty('err')) {
    errorHandler(result.err);
  } 
}


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

export async function addSelection(selection) {
  await fetch('http://localhost:7000/selections', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selection)
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

export async function editSelection(selection) {
  console.log('Edit selection PUT')
  const {
    selectionId, 
    selectionTitle, 
    selectionAuthor,
    authorEmail,
    selectionDate
  } = selection;

  await fetch(`http://localhost:7000/selections/${selectionId}`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: selectionAuthor,
        title: selectionTitle,
        email: authorEmail,
        date: selectionDate
      })
    }
  );
}