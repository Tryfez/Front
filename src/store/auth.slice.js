import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../api/axios.js";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  users: []
}

export const login = createAsyncThunk('auth/login', async (userData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post('/api/auth/login', userData)

    return data
  } catch (e) {
    return rejectWithValue(e?.response?.data)
  }
})

export const registration = createAsyncThunk('auth/reg', async (userData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post('/api/users', userData)

    return data
  } catch (e) {
    return rejectWithValue(e?.response?.data)
  }
})

export const fetchAllUsers = createAsyncThunk('auth/users', async (_, {rejectWithValue}) => {
  try {
    const {data} = await axios.get('api/users')

    return data
  } catch (e) {
    return rejectWithValue(e?.response?.data)
  }
})

const auth = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.users = [];
    }
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false

      state.user = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })

    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })

    builder.addCase(registration.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(registration.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.error = null
    })
    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export const {logout} = auth.actions;
export default auth.reducer