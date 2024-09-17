import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as bookService from '../../services/booksService';


const BookForm = (props) => {
  const [formData, setFormData] = useState({
    category: 'Other',
    title: '',
    text: '',
  });

  const { bookId } = useParams();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (bookId) {
        props.handleUpdateBook(bookId, formData);
      } else {
        props.handleAddBook(formData);
      }
  };

  useEffect(() => {
    const fetchBook = async () => {
      const bookData = await bookService.show(bookId);
      setFormData(bookData);
    };
    if (bookId) fetchBook();
  }, [bookId]);

  return (
    <main>
      <form onSubmit={handleSubmit}>
      <h1>{bookId ? 'Edit Book' : 'New Book'}</h1>
        <label htmlFor="title-input">Book Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Book Author</label>
        <textarea
          required
          type="text"
          name="bookAuthor"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Mystery">Mystery</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Adventure">Adventure</option>
          <option value="Thriller">Thriller</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Memoir">Memoir</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default BookForm;