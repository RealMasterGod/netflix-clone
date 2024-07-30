
import axios from 'axios'
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from './ListActions'

export const getLists = async (dispatch) => {
    dispatch(getListsStart())
    // console.log("hello")
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}lists/all`, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            },
        })
        dispatch(getListsSuccess(res.data))
    } catch (err) {
        dispatch(getListsFailure())
    }
}

export const deleteList = async (id,dispatch) => {
    dispatch(deleteListStart())
    // console.log("hello")
    try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}lists/`+id, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            },
        })
        dispatch(deleteListSuccess(id))
    } catch (err) {
        dispatch(deleteListFailure())
    }
}

export const createList = async (list,dispatch) => {
    dispatch(createListStart())
    // console.log("hello")
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}lists`, list, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            },
        })
        dispatch(createListSuccess(res.data))
    } catch (err) {
        dispatch(createListFailure)
    }
}

// export const updateMovie = async (id,movie,dispatch) => {
//     dispatch(updateMovieStart())
//     // console.log("hello")
//     try {
//         const res = await axios.put("http://localhost:8800/api/movies/"+id, movie, {
//             headers: {
//                 token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
//             },
//         })
//         dispatch(updateMovieSuccess(res.data))
//     } catch (err) {
//         dispatch(updateMovieFailure())
//     }
// }