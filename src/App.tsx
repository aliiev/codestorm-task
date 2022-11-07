import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import List from './pages/List'
import './App.scss'

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null || sessionStorage.getItem('accessToken') !== null)
      navigate('/list')
    else
      navigate('/')
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/list" element={<List />} />
    </Routes>
  )
}
