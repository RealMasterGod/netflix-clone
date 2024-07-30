import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "./AuthActions"

const AuthReducer = (state,action) => {
    if(action.type === LOGIN_START) {
        return {
            user: null,
            isFetching: true,
            error: false,
        }
    }
    if(action.type === LOGIN_SUCCESS) {
        return {
            user: action.payload,
            isFetching: false,
            error: false,
        }
    }
    if(action.type === LOGIN_FAILURE) {
        return {
            user: null,
            isFetching: false,
            error: true,
        }
    }
    if(action.type === LOGOUT) {
        return {
            user: null,
            isFetching: false,
            error: false,
        }
    }
    return {...state}
}

export default AuthReducer