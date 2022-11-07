import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

export interface IData {
  email: string,
  password: string
}

export async function login(data: IData): Promise<string> {  
  const res = await axios.post(BASE_URL + '/login', data)
  return res.data.accessToken
}
