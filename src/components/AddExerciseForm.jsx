import React, { useState } from 'react';

export default function AddExerciseForm() {
  const [name, setName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [muscleGroup, setMuscleGroup] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({}); // obiect pentru erori

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Exercise name is required';
    if (!videoUrl.trim()) newErrors.videoUrl = 'Video URL is required';
    if (!imageFile) newErrors.imageFile = 'Exercise image is required';
    if (!muscleGroup) newErrors.muscleGroup = 'Please select a muscle group';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true dacă nu sunt erori
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return; // oprește submit dacă nu trece validarea

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('name', name);
    formData.append('videoUrl', videoUrl);
    formData.append('muscleGroup', muscleGroup);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/add_back_exercise', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit form');

      const data = await response.json();
      console.log('Success:', data);

      setSuccessMessage('Exercise added successfully!');

      setName('');
      setVideoUrl('');
      setImageFile(null);
      setMuscleGroup(null);
      setErrors({});

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: 500, margin: 'auto' }}>
      <h3>Add New Exercise</h3>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Exercise Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Video URL</label>
        <input
          type="url"
          className={`form-control ${errors.videoUrl ? 'is-invalid' : ''}`}
          value={videoUrl}
          onChange={e => setVideoUrl(e.target.value)}
        />
        {errors.videoUrl && <div className="invalid-feedback">{errors.videoUrl}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label"></label>
        <input
          type="file"
          className={`${errors.imageFile ? 'is-invalid' : ''}`}
          onChange={e => setImageFile(e.target.files[0])}
        />
        {errors.imageFile && <div className="invalid-feedback d-block">{errors.imageFile}</div>}
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            style={{ marginTop: 10, maxWidth: '100%', height: 'auto' }}
          />
        )}
      </div>

      <div className="mb-3">
        <label className="form-label d-block">Muscle Group:</label>

        <div className="form-check">
          <input
            type="radio"
            id="back"
            name="muscleGroup"
            className={`form-check-input ${errors.muscleGroup ? 'is-invalid' : ''}`}
            checked={muscleGroup === 1}
            onChange={() => setMuscleGroup(1)}
          />
          <label htmlFor="back" className="form-check-label">Back</label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            id="chest"
            name="muscleGroup"
            className={`form-check-input ${errors.muscleGroup ? 'is-invalid' : ''}`}
            checked={muscleGroup === 2}
            onChange={() => setMuscleGroup(2)}
          />
          <label htmlFor="chest" className="form-check-label">Chest</label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            id="legs"
            name="muscleGroup"
            className={`form-check-input ${errors.muscleGroup ? 'is-invalid' : ''}`}
            checked={muscleGroup === 3}
            onChange={() => setMuscleGroup(3)}
          />
          <label htmlFor="legs" className="form-check-label">Legs</label>
        </div>
        {errors.muscleGroup && <div className="invalid-feedback d-block">{errors.muscleGroup}</div>}
      </div>

      <button type="submit" className="btn btn-primary">Add Exercise</button>
    </form>
  );
}
