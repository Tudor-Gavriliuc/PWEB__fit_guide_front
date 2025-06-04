import { useParams } from 'react-router-dom';
import { muscles } from '../data/muscles';
import ExerciseCard from '../components/ExerciseCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExerciseForm from '../components/AddExerciseForm';
import { jwtDecode } from "jwt-decode";

export default function MuscleDetail({
  toggleBackground,
  bgMode,
  likedExercises,
  toggleLike,
  showOnlyLiked,
  toggleShowOnlyLiked
}) {
  const { id } = useParams();
  const muscle = muscles.find(m => m.id === id);
  const [exercises, setExercises] = useState([]);
  const [totalExercises, setTotalExercises] = useState(0);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(false);


    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log('the role is' +  decoded.role)
          setRole(decoded.role || null);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Invalid token:', error);
          setRole(false);
          setIsLoggedIn(false);
        }
      } else {
        setRole(null);
        setIsLoggedIn(false);
      }
    }, []);
  useEffect(() => {
    if (!muscle) return;

    let apiUrl = '';
    switch (muscle.id) {
      case 'chest':
        apiUrl = 'http://127.0.0.1:8000/api/get_chest_exercises';
        break;
      case 'back':
        apiUrl = 'http://127.0.0.1:8000/api/get_back_exercises';
        break;
      case 'legs':
        apiUrl = 'http://127.0.0.1:8000/api/get_legs_exercises';
        break;
    }

    if (apiUrl) {
      axios
        .get(apiUrl, {
          params: {
            page: currentPage,
            page_size: cardsPerPage
          }
        })
        .then(response => {
          setExercises(response.data.results);
          setTotalExercises(response.data.total);
        })
        .catch(error => {
          console.error('API error:', error);
        });
    }
  }, [muscle, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [showOnlyLiked]);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this exercise?')) return;

    try {
      const token = localStorage.getItem('token');
console.log('Token:', token);

      const response = await fetch(`http://127.0.0.1:8000/api/delete_exercise/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Server error:', data);
        throw new Error(data.message || 'Failed to delete');
      }

      window.location.reload();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleFormClose = () => {
    setShowAddExercise(false);
    window.location.reload();
  };

  const handleEdit = exerciseId => {
    const exerciseToEdit = exercises.find(e => e.id === exerciseId);
    setCurrentExercise(exerciseToEdit);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', currentExercise.name);
    formData.append('description', currentExercise.description);
    formData.append('muscle_group', currentExercise.muscle_group);
    formData.append('id', currentExercise.id);

    if (currentExercise.image instanceof File) {
      formData.append('image', currentExercise.image);
    }
  const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/update_exercise', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to update');

      const data = await response.json();
      console.log('Updated:', data);
      window.location.reload();
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (!muscle) return <p className="text-center mt-4">Grupa musculară nu a fost găsită.</p>;

  const filteredExercises = exercises.filter(
    ex => !showOnlyLiked || likedExercises.includes(ex.id)
  );

  const totalPages = Math.ceil(totalExercises / cardsPerPage);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        toggleBackground={toggleBackground}
        bgMode={bgMode}
        showOnlyLiked={showOnlyLiked}
        toggleShowOnlyLiked={toggleShowOnlyLiked}
        toggleShowAddExercise={setShowAddExercise}
        role={role}
      />

      <main className="flex-grow-1">
        {!isEditing && showAddExercise && (
          <div
            className="modal-content p-4 bg-white rounded shadow"
            style={{ maxWidth: 600, margin: '2rem auto' }}
          >
            <button
              className="btn btn-sm btn-outline-danger mb-3"
              onClick={handleFormClose}
            >
              Închide
            </button>
            <AddExerciseForm />
          </div>
        )}

        {isEditing && currentExercise && (
          <div
            className="modal-content p-4 bg-white rounded shadow"
            style={{ maxWidth: 600, margin: '2rem auto' }}
          >
            <form
              onSubmit={e => {
                e.preventDefault();
                handleUpdate();
              }}
              className="mt-4"
            >
              <label htmlFor="name" className="form-check-label">
                Exercise Name
              </label>
              <input
                id="name"
                type="text"
                value={currentExercise.name}
                onChange={e =>
                  setCurrentExercise({ ...currentExercise, name: e.target.value })
                }
                className="form-control mb-2"
                placeholder="Exercise name"
              />

              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm ms-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <div
          className="container-fluid"
          style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem' }}
        >
          {!isEditing && !showAddExercise && filteredExercises.length > 0 && (
            <>
              <div className="row g-4">
                {filteredExercises.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    toggleLike={toggleLike}
                    liked={likedExercises.includes(exercise.id)}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    isLoggedIn={isLoggedIn}
                    role={role}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center my-4">
                  <nav>
                    <ul className="pagination">
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li
                          key={index}
                          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
