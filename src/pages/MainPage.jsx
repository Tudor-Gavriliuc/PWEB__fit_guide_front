import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { muscles } from '../data/muscles';
import MuscleCard from '../components/MuscleCard';

export default function MainPage({ toggleBackground, bgMode }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar toggleBackground={toggleBackground} bgMode={bgMode} />

      <main className="flex-grow-1">
        <div className="container-fluid mt-5">
          <div className="responsive-padding">
            <h1 className="text-center mb-5"></h1>

            <div className="d-flex flex-column align-items-center gap-4">
              {muscles.map((muscle) => (
                <div key={muscle.id} className="w-100" style={{ maxWidth: '1400px' }}>
                  <MuscleCard muscle={muscle} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
