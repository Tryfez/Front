import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../api/axios'

const initialState = {
  tasks: [],
  columns: [],
  error: null,
  isLoading: false,
  notification: {},
}

export const subscribeToFetchTasks = createAsyncThunk(
  'tasks/subscribe',
  async ({user}, {rejectWithValue, dispatch}) => {
    try {
      const {data} = await axios.get('/api/tasks/subscribe', {
        params: {id: user.id}
      });
      dispatch(subscribeToFetchTasks({user}));

      return {tasks: data.tasks, updatedTask: data.updated_task, currentUser: user};
    } catch (e) {
      setTimeout(() => {
        dispatch(subscribeToFetchTasks({user}));
      }, 100)
      return rejectWithValue(e.response?.data)
    }
  }
)
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (params, {rejectWithValue}) => {
      try {
        const {data} = await axios.get('/api/tasks', {params})

        return data
      } catch (e) {
        return rejectWithValue(e.response?.data)
      }
    })

export const fetchTasksByUser = createAsyncThunk(
    'tasks/fetchTasksByUser',
    async ({user, ...params}, {rejectWithValue}) => {
      try {
        const {data} = await axios.get(`/api/tasks/users/${user.id}`, {params})

        return data
      } catch (e) {
        return rejectWithValue(e.response?.data)
      }
    })

export const fetchColumns = createAsyncThunk(
    'tasks/fetchColumns',
    async (params, {rejectWithValue}) => {
      try {
        const {data} = await axios.get('/api/columns', {params})

        return data
      } catch (e) {
        return rejectWithValue(e.response?.data)
      }
    }
)

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (payload, {rejectWithValue}) => {
      try {
        const {data} = await axios.post('/api/tasks', payload)

        return data
      } catch (e) {
        return rejectWithValue(e.response?.data)
      }
    })

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({...payload}, {rejectWithValue}) => {
      try {
        const {data} = await axios.put(`/api/tasks/${payload.id}`, {
          id: payload.id,
          title: payload.title,
          description: payload.description,
          finished_at: payload.finished_at,
          column_id: payload.column_id,
          user: payload.user
        })

        return data
      } catch (e) {
        return rejectWithValue(e.response?.data)
      }
    }
)

export const createColumn = createAsyncThunk(
    'tasks/createColumn',
    async ({...payload}, {rejectWithValue}) => {
      try {
        const {data} = await axios.post('/api/columns', payload)

        return data
      } catch (e) {
        return rejectWithValue(e.response?.data)
      }
    })

export const updateColumn = createAsyncThunk(
    'tasks/updateColumn',
    async (payload, {rejectWithValue}) => {
      try {
        await axios.put(`/api/columns/${payload.id}`, payload)

        return payload
      } catch (e) {
        return rejectWithValue(e.response?.data)
      }
    })

export const deleteUserFromTask = createAsyncThunk(
    'tasks/deleteUserFromTask',
    async ({id}, {rejectWithValue}) => {
      try {
        await axios.delete(`/api/tasks/users/${id}`)

        return id
      } catch (e) {
        return rejectWithValue(e.response?.data)
      }
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async ({id}, {rejectWithValue}) => {
      try {
        await axios.delete(`/api/tasks/${id}`)

        return id
      } catch (e) {
        return rejectWithValue(e.response?.data)
      }
    }
)

const tasks = createSlice({
  name: 'tasks',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(subscribeToFetchTasks.fulfilled, (state, action) => {
      const {tasks, updatedTask, currentUser} = action.payload;
      state.isLoading = false;
      state.tasks = tasks;

      if (currentUser.id !== updatedTask.user.id) {
        state.notification = {task: {...updatedTask, user: undefined}, user: updatedTask.user};
      }
    })
    builder.addCase(fetchTasks.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false
      state.tasks = action.payload
    })
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })

    builder.addCase(fetchTasksByUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.tasks = action.payload
    })

    builder.addCase(fetchColumns.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchColumns.fulfilled, (state, action) => {
      state.isLoading = false
      state.columns = action.payload
    })
    builder.addCase(fetchColumns.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })

    builder.addCase(createTask.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createTask.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })

    builder.addCase(createColumn.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, {...action.payload, tasks: []}]
    })

    builder.addCase(updateColumn.fulfilled, (state, action) => {
      state.tasks = state.tasks.map(column => {
        return column.id === action.payload.id ? {
          ...column,
          ...action.payload
        } : column
      })
    })

    builder.addCase(deleteUserFromTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.map(column =>
          ({
            ...column,
            tasks: column.tasks
                .map(task => ({
                  ...task,
                  pivot: task.pivot.filter(pivot => pivot.id !== action.payload)
                }))
          })
      )
    })

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.map(column => ({
            ...column,
            tasks: column.tasks.filter(task => task.id !== action.payload)
          })
      )
    })
  }
})

export default tasks.reducer