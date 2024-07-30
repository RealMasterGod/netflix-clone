export const GET_LISTS_START = "GET_LISTS_START"
export const GET_LISTS_SUCCESS = "GET_LISTS_SUCCESS" 
export const GET_LISTS_FAILURE = "GET_LISTS_FAILURE"
export const CREATE_LIST_START = "CREATE_LIST_START"
export const CREATE_LIST_SUCCESS = "CREATE_LIST_SUCCESS" 
export const CREATE_LIST_FAILURE = "CREATE_LIST_FAILURE"
export const DELETE_LIST_START = "DELETE_LIST_START"
export const DELETE_LIST_SUCCESS = "DELETE_LIST_SUCCESS" 
export const DELETE_LIST_FAILURE = "DELETE_LIST_FAILURE"
export const UPDATE_LIST_START = "UPDATE_LIST_START"
export const UPDATE_LIST_SUCCESS = "UPDATE_LIST_SUCCESS" 
export const UPDATE_LIST_FAILURE = "UPDATE_LIST_FAILURE"

export const getListsStart = () => {
    return {type: GET_LISTS_START }
}

export const getListsSuccess = (lists) => {
    return {type: GET_LISTS_SUCCESS, payload: lists }
}

export const getListsFailure = () => {
    return {type: GET_LISTS_FAILURE }
}

export const createListStart = () => {
    return {type: CREATE_LIST_START }
}

export const createListSuccess = (list) => {
    return {type: CREATE_LIST_SUCCESS, payload: list }
}

export const createListFailure = () => {
    return {type: CREATE_LIST_FAILURE }
}

export const deleteListStart = () => {
    return {type: DELETE_LIST_START }
}

export const deleteListSuccess = (id) => {
    return {type: DELETE_LIST_SUCCESS, payload: id }
}

export const deleteListFailure = () => {
    return {type: DELETE_LIST_FAILURE }
}

export const updateListStart = () => {
    return {type: UPDATE_LIST_START }
}

export const updateListSuccess = (id,list) => {
    return {type: UPDATE_LIST_SUCCESS, payload: {id,list} }
}

export const updateListFailure = () => {
    return {type: UPDATE_LIST_FAILURE }
}