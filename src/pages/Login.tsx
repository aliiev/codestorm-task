import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import { login, IData } from '../api'

export default function Login() {
  const [data, setData] = useState<IData>({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (data.email === '' || data.password === '') {
      setError('Insert login data')
      return
    }

    login(data)
      .then(accessToken => {
        localStorage.setItem('accessToken', accessToken)
        navigate('/list')
      })
      .catch(err => {
        setError(err.response.data)
      })
  }

  const handleRegister = () => {
    if (data.email === '' || data.password === '') return
  }

  return (
    <div className="login-page">
      <h1 className="title">Welcome</h1>
      <Input type="text" placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
      <Input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />
      <Checkbox label="Remember me" />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      <button className="btn" onClick={handleRegister}>Register</button>
      <small className="error-text" style={{opacity: error ? 1 : 0}}>{error}!</small>
    </div>
  )
}
