import  { Link } from 'react-router-dom';

export default function HomePage({ books }) {
  return (
    <>
      <h1>StoryTime Review Listings</h1>
      <main>
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
    </>
  );
}
