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
    pushTask: (state, action: PayloadAction<ITask>) => {
      state.push(action.payload)
    },
    removeTask: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload)
    }
  }
})

export const { uploadTasks, pushTask, removeTask } = tasksSlice.actions
export const selectTasks = (state: RootState) => state
export default tasksSlice.reducer
