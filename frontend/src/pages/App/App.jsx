import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/authService';
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import HootListPage from '../HootListPage/HootListPage'; 
import HootDetails from '../HootDetailsPage/HootDetailsPage'
import HootForm from '../../components/HootForm/HootForm';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import * as hootService from '../../services/hootsService'
import CommentForm from '../../components/NewCommentForm/NewCommentForm';


function App() {
  const [user, setUser] = useState(getUser());

  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
  
      // Set state:
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  const navigate = useNavigate();

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate('/hoots');
  };

  const handleDeleteHoot = async (hootId) => {
    const deletedHoot = await hootService.deleteHoot(hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate('/hoots');
  };

  const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
  
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
  
    navigate(`/hoots/${hootId}`);
  };

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hoots" element={<HootListPage hoots={hoots} />} />
            <Route path="/hoots/:hootId" element={<HootDetails user={user} handleDeleteHoot={handleDeleteHoot} />} />
            <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot} />} />
            <Route path="/hoots/:hootId/edit" element={<HootForm handleUpdateHoot={handleUpdateHoot} />} />
            <Route path="/hoots/:hootId/comments/:commentId/edit" element={<CommentForm />} />
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
