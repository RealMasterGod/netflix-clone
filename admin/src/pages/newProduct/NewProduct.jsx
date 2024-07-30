import "./newProduct.css";
import React from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import {MovieContext} from '../../context/movieContext/MovieContext';

export default function NewProduct() {
  const [movie, setMovie] = React.useState({});
  const [img, setImg] = React.useState(null);
  const [trailer, setTrailer] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [imgTitle, setImgTitle] = React.useState(null);
  const [imgSm, setImgSm] = React.useState(null);
  const [uploaded,setUploaded] = React.useState(0)
  const [success,setSuccess] = React.useState("initial")
  const storage = getStorage(app)

  const {dispatch,error} = React.useContext(MovieContext)

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };
  const upload = (items) => {
    items.forEach(item => {
    const fileName = new Date().getTime() + item.label + item.file.name 
    const storageRef = ref(storage,'items/'+ fileName)
    const uploadTask = uploadBytesResumable(storageRef, item.file)
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("something")
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        conole.log(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setMovie(prev => {
            return {...prev,[item.label]: downloadURL}
          })
          setUploaded(prev => prev + 1)
        });
      }
    )
    })
  }
  const handleUpload = (e) => {
    e.preventDefault()
    upload([
      {file: img, label: "img"},
      {file: imgTitle, label: "imgTitle"},
      {file: imgSm, label: "imgSm"},
      {file: trailer, label: "trailer"},
      {file: video, label: "video"},
    ])
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    createMovie(movie,dispatch)
    setSuccess(error)
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          {img && <img src={URL.createObjectURL(img)}></img>}
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          {imgTitle && <img src={URL.createObjectURL(imgTitle)}></img>}
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          {imgSm && <img src={URL.createObjectURL(imgSm)}></img>}
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="eg. John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="number"
            placeholder="2024"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="eg. Comedy, Horror etc"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="number"
            placeholder="+13"
            name="limit"
            onChange={handleChange}
          />
        </div>
        {/* <div className="addProductItem">
          <label>Stock</label>
          <input type="text" placeholder="123" />
        </div> */}
        <div className="addProductItem">
          <label>isSeries</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (<button onClick={handleSubmit} className="addProductButton">Create</button>) : (<button onClick={handleUpload} className="addProductButton">Upload</button>)}
        
      </form>
      {success !== "initial" ? (!error ? <span style={{color: 'green'}}>UPLOAD SUCCESSFUL</span> : <span style={{color: 'red'}}>UPLOAD FAILED</span>) : ""}
    </div>
  );
}
