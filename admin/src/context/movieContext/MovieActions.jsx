export const GET_MOVIES_START = "GET_MOVIES_START"
export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS" 
export const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE"
export const CREATE_MOVIE_START = "CREATE_MOVIE_START"
export const CREATE_MOVIE_SUCCESS = "CREATE_MOVIE_SUCCESS" 
export const CREATE_MOVIE_FAILURE = "CREATE_MOVIE_FAILURE"
export const DELETE_MOVIE_START = "DELETE_MOVIE_START"
export const DELETE_MOVIE_SUCCESS = "DELETE_MOVIE_SUCCESS" 
export const DELETE_MOVIE_FAILURE = "DELETE_MOVIE_FAILURE"
export const UPDATE_MOVIE_START = "UPDATE_MOVIE_START"
export const UPDATE_MOVIE_SUCCESS = "UPDATE_MOVIE_SUCCESS" 
export const UPDATE_MOVIE_FAILURE = "UPDATE_MOVIE_FAILURE"

export const getMoviesStart = () => {
    return {type: GET_MOVIES_START }
}

export const getMoviesSuccess = (movies) => {
    return {type: GET_MOVIES_SUCCESS, payload: movies }
}

export const getMoviesFailure = () => {
    return {type: GET_MOVIES_FAILURE }
}

export const createMovieStart = () => {
    return {type: CREATE_MOVIE_START }
}

export const createMovieSuccess = (movie) => {
    return {type: CREATE_MOVIE_SUCCESS, payload: movie }
}

export const createMovieFailure = () => {
    return {type: CREATE_MOVIE_FAILURE }
}

export const deleteMovieStart = () => {
    return {type: DELETE_MOVIE_START }
}

export const deleteMovieSuccess = (id) => {
    return {type: DELETE_MOVIE_SUCCESS, payload: id }
}

export const deleteMovieFailure = () => {
    return {type: DELETE_MOVIE_FAILURE }
}

export const updateMovieStart = () => {
    return {type: UPDATE_MOVIE_START }
}

export const updateMovieSuccess = (id,movie) => {
    return {type: UPDATE_MOVIE_SUCCESS, payload: {id,movie} }
}

export const updateMovieFailure = () => {
    return {type: UPDATE_MOVIE_FAILURE }
}