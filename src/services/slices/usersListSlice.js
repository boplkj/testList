import { createSlice } from '@reduxjs/toolkit'
import { GET_USERS_URL } from '../../utils/constants'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    usersRequest: false,
    usersSuccess: false,
    usersError: false,
  },
  reducers: {
    usersSuccess: (state, action) => ({
      users: action.payload,
      usersRequest: false,
      usersError: false,
      usersSuccess: true,
    }),
    usersRequest: () => ({
      usersRequest: true,
      usersError: false,
      usersSuccess: false,
    }),
    usersError: () => ({
      usersRequest: false,
      usersError: true,
      usersSuccess: false,
    }),
  },
})

export default usersSlice.reducer

export const {
  usersSuccess,
  usersRequest,
  usersError,
} = usersSlice.actions

export const getUsers = (count) => (dispatch) => {
  dispatch(usersRequest())
  fetch(`${GET_USERS_URL}?per_page= ${count}`, {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response.status)
    })
    .then((data) => {
      dispatch(usersSuccess(data))
    })
    .catch(() => {
      dispatch(usersError())
    })
}
