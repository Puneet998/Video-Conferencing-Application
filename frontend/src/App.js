import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing';
import AuthenticationPage from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home.jsx';
import VideoMeetComponent from './pages/VideoMeet.jsx';
import History from './pages/history.jsx';
function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="/:url" element={<VideoMeetComponent/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/home" element={<Home/>}/>
          
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
