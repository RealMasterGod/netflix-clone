
import { CREATE_MOVIE_FAILURE, CREATE_MOVIE_START, CREATE_MOVIE_SUCCESS, DELETE_MOVIE_FAILURE, DELETE_MOVIE_START, DELETE_MOVIE_SUCCESS, GET_MOVIES_FAILURE, GET_MOVIES_START, GET_MOVIES_SUCCESS, UPDATE_MOVIE_FAILURE, UPDATE_MOVIE_START, UPDATE_MOVIE_SUCCESS } from "./MovieActions"

const MovieReducer = (state,action) => {
    if(action.type === GET_MOVIES_START) {
        return {
            movies: [],
            isFetching: true,
            error: false,
        }
    }
    if(action.type === GET_MOVIES_SUCCESS) {
        return {
            movies: action.payload,
            isFetching: false,
            error: false,
        }
    }
    if(action.type === GET_MOVIES_FAILURE) {
        return {
            movies: [],
            isFetching: false,
            error: true,
        }
    }
    if(action.type === CREATE_MOVIE_START) {
        return {
            ...state,
            isFetching: true,
            error: false,
        }
    }
    if(action.type === CREATE_MOVIE_SUCCESS) {
        return {
            movies: [...state.movies, action.payload],
            isFetching: false,
            error: false,
        }
    }
    if(action.type === CREATE_MOVIE_FAILURE) {
        return {
            ...state,
            isFetching: false,
            error: true,
        }
    }
    if(action.type === DELETE_MOVIE_START) {
        return {
            ...state,
            isFetching: true,
            error: false,
        }
    }
    if(action.type === DELETE_MOVIE_SUCCESS) {
        return {
            movies: state.movies.filter(movie => movie._id !== action.payload),
            isFetching: false,
            error: false,
        }
    }
    if(action.type === DELETE_MOVIE_FAILURE) {
        return {
            ...state,
            isFetching: false,
            error: true,
        }
    }
    if(action.type === UPDATE_MOVIE_START) {
        return {
            ...state,
            isFetching: true,
            error: false,
        }
    }
    if(action.type === UPDATE_MOVIE_SUCCESS) {
        return {
            ...state,
            isFetching: false,
            error: false,
        }
    }
    if(action.type === UPDATE_MOVIE_FAILURE) {
        return {
            ...state,
            isFetching: false,
            error: true,
        }
    }
    return {...state}
}

export default MovieReducer