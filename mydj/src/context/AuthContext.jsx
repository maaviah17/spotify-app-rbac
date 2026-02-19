import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('mydj_user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('mydj_user', JSON.stringify(userData))
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch (_) {}
    setUser(null)
    localStorage.removeItem('mydj_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)