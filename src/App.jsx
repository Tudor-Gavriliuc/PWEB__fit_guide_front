import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import MuscleDetail from './pages/MuscleDetail';
import darkBg from './assets/dark_theme.png';
import lightBg from './assets/white_theme.png';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [bgMode, setBgMode] = useState('dark');
  const [likedExercises, setLikedExercises] = useState([]);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgMode === 'dark' ? darkBg : lightBg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }, [bgMode]);

  const toggleBackground = () => {
    setBgMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLike = (exerciseId) => {
    setLikedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const toggleShowOnlyLiked = () => {
    setShowOnlyLiked((prev) => !prev);
  };

  return (
    <BrowserRouter basename="/fit-guide"> {}
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              toggleBackground={toggleBackground}
              bgMode={bgMode}
            />
          }
        />
        <Route
          path="/muscles/:id"
          element={
            <MuscleDetail
              toggleBackground={toggleBackground}
              bgMode={bgMode}
              likedExercises={likedExercises}
              toggleLike={toggleLike}
              showOnlyLiked={showOnlyLiked}
              toggleShowOnlyLiked={toggleShowOnlyLiked}
            />
          }
        />
        <Route path="/register" element={<RegisterPage toggleBackground={toggleBackground}
              bgMode={bgMode}/>} />
        <Route path="/login" element={<LoginPage toggleBackground={toggleBackground}
              bgMode={bgMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;