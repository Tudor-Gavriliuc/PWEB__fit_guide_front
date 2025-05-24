import { useParams } from 'react-router-dom';
import { muscles } from '../data/muscles';
import chestExercises from '../data/chestExercises.js';
import backExercises from '../data/backExercises.js';
import legsExercises from '../data/legsExercises.js';
import ExerciseCard from '../components/ExerciseCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExerciseForm from '../components/AddExerciseForm';

export default function MuscleDetail({ toggleBackground, bgMode, likedExercises, toggleLike, showOnlyLiked, toggleShowOnlyLiked }) {
  const { id } = useParams();
  const muscle = muscles.find(m => m.id === id);
  const [exercises, setExercises] = useState({});
  const [showAddExercise, setShowAddExercise] = useState(false);

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
      axios.get(apiUrl)
        .then(response => {
          setExercises(response.data);
        })
        .catch(error => {
          console.error('API error:', error);
        });
    }
  }, [muscle]);

  const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this exercise?')) return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/delete_exercise/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete');

        window.location.reload();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    };

    const handleFormClose = async (id) => {
        setShowAddExercise(false);
        window.location.reload();
    };

  if (!muscle) return <p className="text-center mt-4">Grupa musculară nu a fost găsită.</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        toggleBackground={toggleBackground}
        bgMode={bgMode}
        showOnlyLiked={showOnlyLiked}
        toggleShowOnlyLiked={toggleShowOnlyLiked}
        toggleShowAddExercise={setShowAddExercise}
      />

      <main className="flex-grow-1">
          {showAddExercise && (
              <div className="modal-content p-4 bg-white rounded shadow" style={{ maxWidth: 600, margin: '2rem auto' }}>
                <button
                  className="btn btn-sm btn-outline-danger mb-3"
                  onClick={() => handleFormClose()}
                >
                  Închide
                </button>
                <AddExerciseForm />
              </div>
          )}

        <div className="container-fluid" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem' }}>
          {exercises.length > 0 && !showAddExercise&& (
            <div className="row g-4">
              {exercises
                .filter(ex => !showOnlyLiked || likedExercises.includes(ex.id))
                .map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    toggleLike={toggleLike}
                    liked={likedExercises.includes(exercise.id)}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
