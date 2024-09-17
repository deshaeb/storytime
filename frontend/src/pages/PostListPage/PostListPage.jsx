import { Link } from 'react-router-dom';

export default function PostListPage(props) {
  return (
    <>
    <h1>Book Review Listings</h1>
      <main>
    {props.books.map((book) => (
      <Link key={book._id} to={`/books/${book._id}`}>
        <article>
          <header>
            <h2>{book.title}</h2>
            <p>
              {book.author.username} posted on 
              {new Date(book.createdAt).toLocaleDateString()}
            </p>
          </header>
          <p>{book.text}</p>
        </article>
      </Link>
    ))}
  </main>
  </>
  
)
}
