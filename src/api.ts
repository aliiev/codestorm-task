import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

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
