import { Link } from 'react-router-dom';

export default function Navbar({
  toggleBackground,
  bgMode,
  showOnlyLiked,
  toggleShowOnlyLiked,
  toggleShowAddExercise,
  role,
}) {
  const isDark = bgMode === 'dark';

  return (
    <div className="d-flex justify-content-center">
      <nav
        className={`navbar navbar-expand-lg shadow ${isDark ? 'navbar-dark' : 'navbar-light'}`}
        style={{
          width: '100%',
          maxWidth: '70vw',
          margin: '1.5rem auto',
          borderRadius: '1rem',
          backdropFilter: 'blur(8px)',
          backgroundColor: isDark ? 'rgba(30,30,30,0.9)' : '#ffffff'
        }}
      >
        <div className="container-fluid px-4">
          <Link to="/" className={`navbar-brand fw-bold fs-3 text-uppercase ${isDark ? 'text-white' : 'text-dark'}`}>
            🏋️ Fit Guide
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-3 align-items-center">
              {toggleShowOnlyLiked && (
                <>
                  <li className="nav-item">
                    <button
                      onClick={() => toggleShowOnlyLiked(false)}
                      className={`btn ${!showOnlyLiked ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                      Toate Exercițiile
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={() => toggleShowOnlyLiked(true)}
                      className={`btn ${showOnlyLiked ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                      Favorite ❤️
                    </button>
                  </li>
                </>
              )}

              <li className="nav-item">
                <button
                  onClick={toggleBackground}
                  className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'}`}
                  style={{ borderRadius: '2rem' }}
                >
                  🖼️ Fundal {isDark ? 'deschis' : 'închis'}
                </button>
              </li>

              {role === 'admin' && (
                  <li className="nav-item">
                    <button
                      onClick={() => {
                        if (typeof toggleShowAddExercise === 'function') {
                          toggleShowAddExercise(true);
                        }
                      }}
                      className="btn btn-success"
                    >
                      + Adaugă Exercițiu
                    </button>
                  </li>
                )}


              {/* 🔐 Login/Register Buttons */}
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
