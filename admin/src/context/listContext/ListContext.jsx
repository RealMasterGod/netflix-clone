import {createContext, useEffect, useReducer} from 'react'
import ListReducer from './ListReducer'

const initialState = {
    lists: [],
    isFetching: false,
    error: false,
}

export const ListContext = createContext(initialState)

export const ListContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(ListReducer, initialState)

    return (
        <ListContext.Provider value={{...state, dispatch}}>
            {children}
        </ListContext.Provider>
    )
}