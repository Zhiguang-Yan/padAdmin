import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, getUserInfoApi, logoutApi } from '@/api/user'
import { setToken, removeToken, getToken } from '@/utils/auth'
import { RootState } from '@/redux'

const namespace = 'user'
export const initialState: Store['user'] = {
  token: getToken(),
  roles: [],
  userInfo: {
    username: null
  }
}

// login
export const login = createAsyncThunk(
  `${namespace}/login`,
  async (user: { username: string; password: string }) => {
    const res = await loginApi({
      username: user.username,
      password: user.password
    })
    if (res.data) {
      return res.data
    }
    throw res
  }
)

// getUserInfo
export const getUserInfo = createAsyncThunk(
  `${namespace}/getUserInfo`,
  async (_, { getState }: any) => {
    const { token } = getState().user
    const res = await getUserInfoApi(token)
    if (res.data) {
      return res.data
    }
    throw res
  }
)

// logout
export const logout = createAsyncThunk(`${namespace}/logout`, async () => {
  const res = await logoutApi()
  return res
})

export const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    resetToken(state) {
      removeToken()
      state.token = getToken()
      state.roles = []
      state.userInfo!.username = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token
        setToken(state.token)
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        const { username, roles } = payload
        state.userInfo!.username = username
        state.roles = roles
      })
      .addCase(logout.fulfilled, (state) => {
        removeToken()
        state.token = getToken()
        state.roles = []
        state.userInfo!.username = null
      })
  }
})

export const { resetToken } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
