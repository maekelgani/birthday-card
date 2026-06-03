import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import GalleryPage from './pages/GalleryPage';
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
          </Routes>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
