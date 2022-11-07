import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTasks, ITask } from '../api'

export default function List() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    getTasks(localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '')
      .then(res_tasks => {
        setTasks(res_tasks)
      })
      .catch(err => {
        setError(err.response.data)
      })
  }, []) 

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
          {!tasks.length && <span className="list-empty">Empty</span>}
          {tasks.map(task => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ol>
      </div>
      <button className="btn" onClick={logout}>Logout</button>
      <small className="error-text" style={{opacity: error ? 1 : 0 }}>{error}!</small>
    </>
  )
}
