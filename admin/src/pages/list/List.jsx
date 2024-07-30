import { Link, useLocation } from "react-router-dom";
import "./list.css";
import React from "react";
// import Chart from "../../components/chart/Chart"
import { Publish } from "@mui/icons-material";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ListContext } from "../../context/listContext/ListContext";

export default function List() {
  const location = useLocation();
  const list = location.state.list;
  const { _id, ...other } = list;
  const [updatedList, setUpdatedList] = React.useState(other);
  const [success, setSuccess] = React.useState("initial");
//   const storage = getStorage(app);

  const { dispatch, error } = React.useContext(ListContext);

  const handleChange = (e) => {
    // const value = e.target.value;
    // setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // updateMovie(_id, updatedMovie, dispatch);
    // createMovie(movie,dispatch)
    // setSuccess(error);
  };
  return (
    <div className="list">
      <div className="listTitleContainer">
        <h1 className="listTitle">List</h1>
        <Link to="/newList">
          <button className="listAddButton">Create</button>
        </Link>
      </div>
      <div className="listTop">
        <div className="listTopRight">
          <div className="listInfoTop">
            {/* <img src={list.img} alt="" className="listInfoImg" /> */}
            <span className="listName">{list.title}</span>
          </div>
          <div className="listInfoBottom">
            <div className="listInfoItem">
              <span className="listInfoKey">id:</span>
              <span className="listInfoValue">{list._id}</span>
            </div>
            <div className="listInfoItem">
              <span className="listInfoKey">genre:</span>
              <span className="listInfoValue">{list.genre}</span>
            </div>
            <div className="listInfoItem">
              <span className="listInfoKey">type:</span>
              <span className="listInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="listBottom">
        <form className="listForm">
          <div className="listFormLeft">
            <label>List Title</label>
            <input
              type="text"
              name="title"
              placeholder={list.title}
              onChange={handleChange}
            />
            <label>Type</label>
            <input
              type="text"
              name="type"
              placeholder={list.type}
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              placeholder={list.genre}
              onChange={handleChange}
            />
          </div>
          <div className="listFormRight">
            <button onClick={handleSubmit} className="listButton">
              Update
            </button>
          </div>
        </form>
      </div>
      {/* {success !== "initial" ? (
        !error ? (
          <span style={{ color: "green" }}>UPDATE SUCCESSFUL</span>
        ) : (
          <span style={{ color: "red" }}>UPDATE FAILED</span>
        )
      ) : (
        ""
      )} */}
    </div>
  );
}
