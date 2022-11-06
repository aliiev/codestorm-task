import Input from '../components/Input'
import Checkbox from '../components/Checkbox'

export default function Login() {
  return (
    <div className="login-page">
      <h1 className="title">Welcome</h1>
      <Input type="text" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Checkbox label="Remember me" />
      <button className="btn">Login</button>
    </div>
  )
}
