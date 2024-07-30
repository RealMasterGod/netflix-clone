import "./newList.css";
import React, { useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { createList } from "../../context/listContext/apiCalls";

export default function NewList() {
  const [list, setList] = React.useState({});
  const [success,setSuccess] = React.useState("initial")
  const {dispatch,error} = React.useContext(ListContext)
  const {dispatch: dispatchMovie,movies} = React.useContext(MovieContext)

  useEffect(() => {
    getMovies(dispatchMovie)
  },[dispatchMovie])

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };


  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    setList({...list,[e.target.name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createList(list,dispatch)
    setSuccess(error)
  }
  return (
    <div className="newList">
      <h1 className="addListTitle">New Movie</h1>
      <form className="addListForm">
        <div className="addListItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="eg. Best Action Movies"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addListItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Action"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addListItem">
          <label>Type</label>
          <select name="type" id="type" onChange={handleChange}>
            <option>---------------------Type-----------------------</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        <div className="addListItem">
          <label>Content</label>
          <select multiple name="content" onChange={handleSelect} style={{height: "200px"}}>
            {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>{movie.title}</option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit} className="addListButton">Create</button>
        
      </form>
      {success !== "initial" ? (!error ? <span style={{color: 'green'}}>UPLOAD SUCCESSFUL</span> : <span style={{color: 'red'}}>UPLOAD FAILED</span>) : ""}
    </div>
  );
}
