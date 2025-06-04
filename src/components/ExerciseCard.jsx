import React from 'react';

export default function ExerciseCard({
  exercise,
  toggleLike,
  liked,
  handleDelete,
  handleEdit,
  isLoggedIn
}) {
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

          {isLoggedIn && (
            <>
              <button
                className="btn btn-sm btn-warning me-2 mt-2"
                onClick={() => handleEdit(exercise.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger mt-2"
                onClick={() => handleDelete(exercise.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
