import { publicRequest } from "../requestMethod"
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux"


export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await publicRequest.post('/auth/login', user)
    dispatch(loginSuccess(res.data))
  } catch (error) {
    dispatch(loginFailure())
  }
}

export const loggedOut = async (dispatch,history) => {
  dispatch(logout())
  await history.push('/Login')
}