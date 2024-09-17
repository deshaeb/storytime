import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as bookService from '../../services/booksService';

const ReviewForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { bookId, reviewId } = useParams();
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (bookId && reviewId) {
        bookService.updateReview(bookId, reviewId, formData);
        navigate(`/books/${bookId}`);
      } else {
        props.handleAddReview(formData);
      }
      setFormData({ text: '' });
  };

  useEffect(() => {
    const fetchBook = async () => {
      const bookData = await bookService.show(bookId);
      // Find review in fetched book data
      setFormData(bookData.reviews.find((review) => review._id === reviewId));
    };
    if (bookId && reviewId) fetchBook();
  }, [bookId, reviewId]);
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your review:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT REVIEW</button>
    </form>
  );
};

export default ReviewForm;