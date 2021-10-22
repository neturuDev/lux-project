
const OneSelection = ({author, title, email, date}) => {
  return(<>
    <h1>Selection: {title}</h1>
    <p>Selection author: {author}</p>
    <p>Author Email: {email}</p>
    <p>Selection date: {date}</p>
  </>)
}

export default OneSelection;