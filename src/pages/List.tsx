import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { uploadTasks, pushTask, removeTask } from '../redux/tasksSlice'
import { getTasks, addTask, deleteTask } from '../api'

export default function List() {
  const [task, setTask] = useState<string>('')
  const [error, setError] = useState<string>('')
  const tasks = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getTasks(localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '')
      .then(res_tasks => dispatch(uploadTasks(res_tasks)))
      .catch(err => setError(err.response.data))
  }, [dispatch]) 

  const handleAddTask = () => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
    const taskData = {id: tasks.length + 1, text: task}

    addTask(token, taskData)
      .then(task => dispatch(pushTask(task)))
      .catch(err => setError(err.response.statusText))
      .then(() => setTask(''))
  }

  const handleDeleteTask = (id: number) => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
    
    deleteTask(token, id)
      .then(() => dispatch(removeTask(id)))
      .catch(err => setError(err.response.statusText))
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    sessionStorage.removeItem('accessToken')
    dispatch(uploadTasks([]))
    navigate('/')
  }

  return (
    <div className="list-page">
      <div className="list-wrapper">
        <h4 className="title">Things to do</h4>
        <ol className="list">
          {!tasks.length && <span className="list-empty">Empty</span>}
          {tasks.map(task => (
            <li key={task.id} className="list-item">
              {task.text}
              <button className="btn-delete" onClick={() => handleDeleteTask(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(255,255,255,1)"/></svg>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="task-form">
        <Input placeholder="Task text" value={task} onChange={e => setTask(e.target.value)} />
        <button className="btn btn-primary" onClick={handleAddTask}>Add task</button>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
      <small className="error-text" style={{opacity: error ? 1 : 0 }}>{error}!</small>
    </div>
  )
}
