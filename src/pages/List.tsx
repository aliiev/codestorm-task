import { useNavigate } from 'react-router-dom'

export default function List() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('accessToken')
    sessionStorage.removeItem('accessToken')
    navigate('/')
  }

  return (
    <>
      <div className="list-page">
        <h4 className="title">Things to do</h4>
        <ol className="list">
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</li>
          <li>Duis pulvinar dictum rutrum.</li>
          <li>Vestibulum vehicula sit amet magna sit amet sodales. Donec sodales maximus eros, nec consectetur ante placerat id.</li>
          <li>Praesent ac quam massa.</li>
          <li>Praesent nec eros diam. Integer feugiat, erat et vehicula egestas</li>
        </ol>
      </div>
      <button className="btn" onClick={logout}>Logout</button>
    </>
  )
}
