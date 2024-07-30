import {createContext, useEffect, useReducer} from 'react'
import AuthReducer from './AuthReducer.jsx'


const initialState = {
    user: (() => {
        if(localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"))
        } else {
            return null
        }
    })(),
    isFetching: false,
    error: false,
}

export const AuthContext = createContext(initialState)

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer, initialState)

    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}