import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/authService';
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import BookDetailsPage from '../BookDetailsPage/BookDetailsPage'
import BookForm from '../../components/BookForm/BookForm';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import * as bookService from '../../services/booksService'
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import PostListPage from '../PostListPage/PostListPage'


function App() {
  const [user, setUser] = useState(getUser());

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      const booksData = await bookService.index();
  
      // Set state:
      setBooks(booksData);
    };
    if (user) fetchAllBooks();
  }, [user]);

  const navigate = useNavigate();

  const handleAddBook = async (bookFormData) => {
    const newBook = await bookService.create(bookFormData);
    setBooks([newBook, ...books]);
    navigate('/books');
  };

  const handleDeleteBook = async (bookId) => {
    const deletedBook = await bookService.deleteBook(bookId);
    setBooks(books.filter((book) => book._id !== deletedBook._id));
    navigate('/books');
  };

  const handleUpdateBook = async (bookId, bookFormData) => {
    const updatedBook = await bookService.update(bookId, bookFormData);
  
    setBooks(books.map((book) => (bookId === book._id ? updatedBook : book)));
  
    navigate(`/books/${bookId}`);
  };

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage books={books}/>} />
            <Route path="/books" element={<PostListPage books={books} />} />
            <Route path="/books/:bookId" element={<BookDetailsPage user={user} handleDeleteBook={handleDeleteBook} />} />
            <Route path="/books/new" element={<BookForm handleAddBook={handleAddBook} />} />
            <Route path="/books/:bookId/edit" element={<BookForm handleUpdateBook={handleUpdateBook} />} />
            <Route path="/books/:bookId/reviews/:reviewId/edit" element={<ReviewForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

export default App;
