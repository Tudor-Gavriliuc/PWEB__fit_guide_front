import React from 'react';

export default function ExerciseCard({ exercise, toggleLike, liked, handleDelete, handleEdit }) {
  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card h-100 exercise-card position-relative overflow-hidden">
        <img
          src={`http://127.0.0.1:8000/storage/${exercise.image}`}
          alt={exercise.name}
          className="img-fluid"
          style={{ height: '280px', objectFit: 'cover' }}
        />
        <div className="exercise-overlay d-flex flex-column justify-content-center align-items-center">
          <h5 className="text-white mb-3 fs-5">{exercise.name}</h5>
          <a
            href={exercise.videoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger btn-sm mb-2"
          >
            Vezi exercițiul
          </a>
          <button
            onClick={() => toggleLike(exercise.id)}
            className={`btn ${liked ? 'btn-success' : 'btn-outline-light'} btn-sm`}
          >
            {liked ? 'Liked ❤️' : 'Like 👍'}
          </button>
          <button
              onClick={() => handleEdit(exercise.id)}
              className="btn btn-warning btn-sm mt-5"
            >
              Edit ✏️
          </button>
          <button
              onClick={() => handleDelete(exercise.id)}
              className="btn btn-danger btn-sm mt-5"
            >
              Delete 🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
