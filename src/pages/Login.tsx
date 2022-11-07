import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import { login, register, IData } from '../api'

export default function Login() {
  const [data, setData] = useState<IData>({
    email: '',
    password: ''
  })
  const [remember, setRemember] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const auth = (method: string) => {
    const authorize:Promise<string> = method === 'login' ? login(data) : register(data)
  
    authorize.then(accessToken => {
      const storage:Storage = remember ? localStorage : sessionStorage
      storage.setItem('accessToken', accessToken)
      navigate('/list')
    })
    .catch(err => {
      setError(err.response.data)
    })
  }

  return (
    <div className="login-page">
      <h1 className="title">Welcome</h1>
      <Input type="text" placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
      <Input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />
      <Checkbox label="Remember me" checked={remember} onChange={() => setRemember(!remember)} />
      <button className="btn btn-primary" onClick={() => auth('login')}>Login</button>
      <button className="btn" onClick={() => auth('register')}>Register</button>
      <small className="error-text" style={{opacity: error ? 1 : 0}}>{error}!</small>
    </div>
  )
}
