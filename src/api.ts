import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

export interface IData {
  email: string,
  password: string
}

export interface ITask {
  id: number,
  text: string
}

export async function login(data: IData): Promise<string> {  
  const res = await axios.post(BASE_URL + '/login', data)
  return res.data.accessToken
}

export async function register(data: IData): Promise<string> {
  const res = await axios.post(BASE_URL + '/register', data)
  return res.data.accessToken
}

export async function getTasks(accessToken: string): Promise<ITask[]> {
  const res = await axios.get(BASE_URL + '/tasks', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return res.data
}

export async function addTask(accessToken:string, task: ITask):Promise<ITask> {
  const res = await axios.post(BASE_URL + '/tasks', task, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return res.data
}

export async function deleteTask(accessToken: string, id: number):Promise<any> {
  const res = await axios.delete(BASE_URL + '/tasks/' + id, {
    headers: {Authorization: `Bearer ${accessToken}`}
  })
  return res
}
