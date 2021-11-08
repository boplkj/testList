import { createSlice } from '@reduxjs/toolkit'

const userRepoSlice = createSlice({
  name: 'userRepo',
  initialState: {
    userRepo: [],
    userRepoRequest: false,
    userRepoSuccess: false,
    userRepoError: false,
  },
  reducers: {
    userRepoSuccess: (state, action) => ({
      userRepo: action.payload,
      userRepoRequest: false,
      userRepoError: false,
      userRepoSuccess: true,
    }),
    userRepoRequest: () => ({
      userRepoRequest: true,
      userRepoError: false,
      userRepoSuccess: false,
    }),
    userRepoError: () => ({
      userRepoRequest: false,
      userRepoError: true,
      userRepoSuccess: false,
    }),
  },
})

export default userRepoSlice.reducer
export const {
  userRepoSuccess,
  userRepoRequest,
  userRepoError,
} = userRepoSlice.actions

export const getUserRepo = (apiUrl) => (dispatch) => {
  dispatch(userRepoRequest())
  fetch(apiUrl, {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response.status)
    })
    .then((data) => {
      dispatch(userRepoSuccess(data))
    })
    .catch(() => {
      dispatch(userRepoError())
    })
}
