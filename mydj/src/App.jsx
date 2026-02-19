import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Cursor   from './components/Cursor'
import Landing  from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Cursor />
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Pages to be added: */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/music"    element={<MusicLibrary />} /> */}
        {/* <Route path="/albums"   element={<Albums />} /> */}
        {/* <Route path="/albums/:id" element={<AlbumDetail />} /> */}
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}
