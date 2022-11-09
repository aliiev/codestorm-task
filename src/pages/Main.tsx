import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import List from '../components/List'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { uploadTasks, pushTask, removeTask } from '../redux/tasksSlice'
import { getTasks, addTask, deleteTask } from '../api'

export default function Main() {
  const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
  const [task, setTask] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const tasks = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getTasks(token)
      .then(res_tasks => dispatch(uploadTasks(res_tasks)))
      .catch(err => setError(err.response.data))
      .then(() => setLoading(false))
  }, [dispatch, token]) 

  const handleAddTask = () => {
    if (task !== '') {
      const taskData = {id: tasks[tasks.length - 1].id + 1, text: task}

      setLoading(true)
      setError('')

      addTask(token, taskData)
        .then(task => dispatch(pushTask(task)))
        .catch(err => setError(err.response.statusText))
        .then(() => {
          setTask('')
          setLoading(false)
        })
    } else {
      setError('Insert task text')
    }
  }

  const handleDeleteTask = (id: number) => {
    setLoading(true)
    setError('')

    deleteTask(token, id)
      .then(() => dispatch(removeTask(id)))
      .catch(err => setError(err.response.statusText))
      .then(() => setLoading(false))
  }

  const handleInputEnter = (key: string) => {
    if (key === 'Enter') handleAddTask()
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
        <List items={tasks} onDelete={id => handleDeleteTask(id)} />
      </div>
      <div className="task-form">
        <Input placeholder="Task text" value={task} disabled={loading} onChange={e => setTask(e.target.value)} onKeyDown={e => handleInputEnter(e.key)} />
        <Button title="Add task" color="primary" disabled={loading} onClick={handleAddTask} />
        <Button title="Logout" disabled={loading} onClick={logout} />
      </div>
      <small className="text-helper" style={{opacity: loading || error ? 1 : 0 }}>
        {loading && 'Loading...'}
        {error && <span className="text-error">{error}</span>}
      </small>
    </div>
  )
}
