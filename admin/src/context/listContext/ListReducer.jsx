import { CREATE_LIST_FAILURE, CREATE_LIST_START, CREATE_LIST_SUCCESS, DELETE_LIST_FAILURE, DELETE_LIST_START, DELETE_LIST_SUCCESS, GET_LISTS_FAILURE, GET_LISTS_START, GET_LISTS_SUCCESS, UPDATE_LIST_FAILURE, UPDATE_LIST_START, UPDATE_LIST_SUCCESS } from "./ListActions"




const ListReducer = (state,action) => {
    if(action.type === GET_LISTS_START) {
        return {
            lists: [],
            isFetching: true,
            error: false,
        }
    }
    if(action.type === GET_LISTS_SUCCESS) {
        return {
            lists: action.payload,
            isFetching: false,
            error: false,
        }
    }
    if(action.type === GET_LISTS_FAILURE) {
        return {
            lists: [],
            isFetching: false,
            error: true,
        }
    }
    if(action.type === CREATE_LIST_START) {
        return {
            ...state,
            isFetching: true,
            error: false,
        }
    }
    if(action.type === CREATE_LIST_SUCCESS) {
        return {
            lists: [...state.lists, action.payload],
            isFetching: false,
            error: false,
        }
    }
    if(action.type === CREATE_LIST_FAILURE) {
        return {
            ...state,
            isFetching: false,
            error: true,
        }
    }
    if(action.type === DELETE_LIST_START) {
        return {
            ...state,
            isFetching: true,
            error: false,
        }
    }
    if(action.type === DELETE_LIST_SUCCESS) {
        return {
            lists: state.lists.filter(list => list._id !== action.payload),
            isFetching: false,
            error: false,
        }
    }
    if(action.type === DELETE_LIST_FAILURE) {
        return {
            ...state,
            isFetching: false,
            error: true,
        }
    }
    if(action.type === UPDATE_LIST_START) {
        return {
            ...state,
            isFetching: true,
            error: false,
        }
    }
    if(action.type === UPDATE_LIST_SUCCESS) {
        return {
            ...state,
            isFetching: false,
            error: false,
        }
    }
    if(action.type === UPDATE_LIST_FAILURE) {
        return {
            ...state,
            isFetching: false,
            error: true,
        }
    }
    return {...state}
}

export default ListReducer