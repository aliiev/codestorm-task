import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'

export default function Login() {
  const [data, setData] = useState<{email: string; password: string}>({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleLogin = () => {
    if (data.email === '' || data.password === '') return
    axios.post('http://localhost:4000/login', data)
      .then(res => {
        console.log('SUCCESS', res)
        localStorage.setItem('accessToken', res.data.accessToken)
        navigate('/list')
      })
      .catch(err => {
        console.log('ERROR', err)
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
    </div>
  )
}
