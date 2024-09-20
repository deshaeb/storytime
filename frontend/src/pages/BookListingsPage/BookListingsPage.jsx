import { Link } from "react-router-dom";
import * as authService from "../../services/authService";
import NavBar from "../../components/NavBar/NavBar";

export default function BookListingsPage({ books }) {
  return (
    <>
      <h1>Recent Book Reviews</h1>
      <main className="listing-container">
        {books.map((book) => (
          <Link key={book._id} to={`/books/${book._id}`}>
            <article>
              <header>
                <h2>{book.title}</h2>
                <h5>{book.bookAuthor}</h5>
                {book.imageUrl && (
                  <img
                    className="bookImg"
                    src={book.imageUrl}
                    alt="Book Image"
                  />
                )}
                <p>
                  {book.author.name} posted: &nbsp;
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
