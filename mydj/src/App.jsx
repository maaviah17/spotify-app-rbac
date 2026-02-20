import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext' 
import { ToastProvider } from './components/Toast'
import Cursor   from './components/Cursor'
import Landing  from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import MusicLibrary from './pages/MusicLibrary'
import Upload from './components/Upload'  
import Profile from './pages/Profile'
import GlobalPlayer from './components/GlobalPlayer'
import AlbumDetail from './pages/AlbumDetail'
import Albums from './pages/Albums'
import { ProtectedRoute, ArtistRoute } from './components/ProtectedRoute'


export default function App() {
  return (
    <AuthProvider>
    <PlayerProvider>
    <ToastProvider>
    <BrowserRouter>
      <Cursor />
    <GlobalPlayer />
      <Routes>
        {/* public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected, for logged in users */}
        <Route path="/music"    element={<ProtectedRoute><MusicLibrary /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* artist only */}
        <Route path="/albums" element={<ProtectedRoute><Albums /></ProtectedRoute>} />
        <Route path="/albums/:albumId" element={<ProtectedRoute><AlbumDetail /></ProtectedRoute>} />
        <Route path="/upload" element={<ArtistRoute><Upload /></ArtistRoute>} />
      </Routes>
    </BrowserRouter>
    </ToastProvider>
    </PlayerProvider>
    </AuthProvider>
  )
}
