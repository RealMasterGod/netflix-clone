import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieActions"
import axios from 'axios'

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart())
    // console.log("hello")
    try {
        const res = await axios.get("http://localhost:8800/api/movies", {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            },
        })
        dispatch(getMoviesSuccess(res.data))
    } catch (err) {
        dispatch(getMoviesFailure())
    }
}

export const deleteMovie = async (id,dispatch) => {
    dispatch(deleteMovieStart())
    // console.log("hello")
    try {
        await axios.delete("http://localhost:8800/api/movies/"+id, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            },
        })
        dispatch(deleteMovieSuccess(id))
    } catch (err) {
        dispatch(deleteMovieFailure())
    }
}

export const createMovie = async (movie,dispatch) => {
    dispatch(createMovieStart())
    // console.log("hello")
    try {
        const res = await axios.post("http://localhost:8800/api/movies/", movie, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            },
        })
        dispatch(createMovieSuccess(res.data))
    } catch (err) {
        dispatch(createMovieFailure())
    }
}

export const updateMovie = async (id,movie,dispatch) => {
    dispatch(updateMovieStart())
    // console.log("hello")
    try {
        const res = await axios.put("http://localhost:8800/api/movies/"+id, movie, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            },
        })
        dispatch(updateMovieSuccess(res.data))
    } catch (err) {
        dispatch(updateMovieFailure())
    }
}