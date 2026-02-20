import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext' 
import Cursor   from './components/Cursor'
import Landing  from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import MusicLibrary from './pages/MusicLibrary'
import Upload from './components/Upload'  
import Profile from './pages/Profile'
import GlobalPlayer from './components/GlobalPlayer'


export default function App() {
  return (
    <AuthProvider>
    <PlayerProvider>
    <BrowserRouter>
      <Cursor />
    <GlobalPlayer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/music"    element={<MusicLibrary />} />
        <Route path="/upload"    element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/albums"   element={<Albums />} /> */}
        {/* <Route path="/albums/:id" element={<AlbumDetail />} /> */}
      </Routes>
    </BrowserRouter>
    </PlayerProvider>
    </AuthProvider>
  )
}
