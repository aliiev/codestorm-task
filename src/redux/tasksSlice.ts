import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface ITask {
  id: number,
  text: string
}

const initialState: ITask[] = []

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    uploadTasks: (state, action: PayloadAction<ITask[]>) => {
      return action.payload
    },
    addTask: (state, action: PayloadAction<ITask>) => {
      state.push(action.payload)
    }
  }
})

export const { addTask, uploadTasks } = tasksSlice.actions
export const selectTasks = (state: RootState) => state
export default tasksSlice.reducer
