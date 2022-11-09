import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import { login, register, IData } from '../api'

export default function Login() {
  const [data, setData] = useState<IData>({email: '', password: ''})
  const [remember, setRemember] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const auth = (method: string) => {
    const authorize:Promise<string> = method === 'login' ? login(data) : register(data)
    setLoading(true)
    setError('')

    authorize.then(accessToken => {
      const storage:Storage = remember ? localStorage : sessionStorage
      storage.setItem('accessToken', accessToken)
      navigate('/main')
    })
    .catch(err => setError(err.response.data))
    .then(() => setLoading(false))
  }

  return (
    <div className="login-page">
      <h1 className="title">Welcome</h1>
      <Input type="text" placeholder="Email" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
      <Input type="password" placeholder="Password" value={data.password} onChange={e => setData({...data, password: e.target.value})} />
      <Checkbox label="Remember me" checked={remember} onChange={() => setRemember(!remember)} />
      <Button title="Login" color="primary" disabled={loading} onClick={() => auth('login')} />
      <Button title="Register" disabled={loading} onClick={() => auth('register')} />
      <small className="text-helper" style={{opacity: loading || error ? 1 : 0}}>
        {loading && 'Loading...'}
        {error && <span className="text-error">{error}</span>}
      </small>
    </div>
  )
}
