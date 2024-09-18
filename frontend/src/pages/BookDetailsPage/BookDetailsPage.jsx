import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as bookService from '../../../src/services/booksService';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import './BookDetailsPage.css'

const BookDetailsPage = ({ user, handleDeleteBook }) => {
    const { bookId } = useParams();
    console.log('bookId', bookId);

    const [book, setBook] = useState(null);


    useEffect(() => {
        const fetchBook = async () => {
          const bookData = await bookService.show(bookId);
          console.log('bookData', bookData);
          setBook(bookData);
        };
        fetchBook();
      }, [bookId]);
      
    // Verify that book state is being set correctly:
    console.log('book state:', book);

    const handleAddReview = async (reviewFormData) => {
        const newReview = await bookService.createReview(bookId, reviewFormData);
        setBook({ ...book, reviews: [...book.reviews, newReview] });
    };

    const handleDeleteReview = async (reviewId) => {
        console.log('reviewId:', reviewId);
        const deleteReview = await bookService.deleteReview(bookId, reviewId)
        setBook({...book, reviews: book.reviews.filter((review) => review._id !== reviewId),});
      };

    if (!book) return <main>Loading...</main>
    return (
        <main>
          <header>
            <h1>{book.title}</h1>
            <p>{book.category.toUpperCase()}</p>
            {book.imageUrl && <img className="bookImg" src={book.imageUrl} alt="Book Image"/>}
            <p>
              {book.author.username} Posted on: &nbsp;
              {new Date(book.createdAt).toLocaleDateString()}
            </p>
            {book.author._id === user._id && (
            <>
                <Link to={`/books/${bookId}/edit`}>Edit</Link>
                <button onClick={() => handleDeleteBook(bookId)}>Delete</button>
            </>
            )}
          </header>
          <p>{book.text}</p>
          <section>
            <h2>Reviews</h2>
            <ReviewForm handleAddReview={handleAddReview} />
            {!book.reviews.length && <p>There are no reviews.</p>}
            {book.reviews.map((review) => (
                <article key={review._id}>
                <header>
                    <p>
                    {review.author.username} posted on: 
                    {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                    <Link to={`/books/${bookId}/reviews/${review._id}/edit`}>Edit</Link>
                    <button onClick={() => handleDeleteReview(review._id)} >Delete</button>
                </header>
                <p>{review.text}</p>
                </article>
            ))}
          </section>
        </main>
      );
  };

  
  export default BookDetailsPage;