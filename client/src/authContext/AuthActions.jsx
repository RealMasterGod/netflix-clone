export const LOGIN_START = "LOGIN_START"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGOUT = "LOGOUT"


export const loginStart = () => {
    return {type: LOGIN_START}
}

export const loginSuccess = (user) => {
    return {type: LOGIN_SUCCESS, payload: user}
}

export const loginFailure = () => {
    return {type: LOGIN_FAILURE}
}

export const logout = () => {
    return {type: LOGOUT}
}
