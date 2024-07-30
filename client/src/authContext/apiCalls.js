import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user,dispatch) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}auth/login`,user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}