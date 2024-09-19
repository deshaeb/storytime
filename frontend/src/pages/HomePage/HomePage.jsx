import  { Link } from 'react-router-dom';

export default function HomePage({ books }) {
  return (
    <section>
      <h1>Story Time Reviews</h1>
      <main className="listing-container">
        {books.map((book) => (
          <Link key={book._id} to={`/books/${book._id}`}>
            <article>
              <header>
                <h2>{book.title}</h2>
                {book.imageUrl && <img className="bookImg" src={book.imageUrl} alt="Book Image"/>}
                <p>
                  {book.author.username} Posted on: &nbsp;
                  {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </header>
              <p>{book.text}</p>
            </article>
          </Link>
        ))}
      </main>
    </section>
  )
};
