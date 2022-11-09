import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null || sessionStorage.getItem('accessToken') !== null)
      navigate('/main')
    else
      navigate('/')
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  )
}
