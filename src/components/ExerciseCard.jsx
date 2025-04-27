import React from 'react';

export default function ExerciseCard({ exercise, toggleLike, liked }) {
  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card h-100 exercise-card position-relative overflow-hidden">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="img-fluid"
          style={{ height: '280px', objectFit: 'cover' }}
        />
        <div className="exercise-overlay d-flex flex-column justify-content-center align-items-center">
          <h5 className="text-white mb-3 fs-5">{exercise.name}</h5>
          <a
            href={exercise.videoUrl}
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
        </div>
      </div>
    </div>
  );
}
