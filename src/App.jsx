import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import GalleryPage from './pages/GalleryPage';
import AboutUs from './pages/AboutUs';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <AudioPlayer />
        <div className="relative z-20 w-full min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutUs />} />
            {/* QA Bugfix: Tangkap semua rute salah (termasuk /AboutUs) dan arahkan ke /about */}
            <Route path="/AboutUs" element={<Navigate to="/about" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
