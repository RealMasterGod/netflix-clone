import { Link, useLocation } from "react-router-dom";
import "./product.css";
import React from "react";
// import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData";
import { Publish } from "@mui/icons-material";
import {MovieContext} from '../../context/movieContext/MovieContext';
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateMovie } from "../../context/movieContext/apiCalls";

export default function Product() {
  const location = useLocation();
  const movie = location.state.movie;
  const {_id, ...other} = movie
  const [updatedMovie, setUpdatedMovie] = React.useState(other);
  const [img, setImg] = React.useState(null);
  const [trailer, setTrailer] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [imgTitle, setImgTitle] = React.useState(null);
  const [imgSm, setImgSm] = React.useState(null);
  const [uploaded, setUploaded] = React.useState(0);
  const [success, setSuccess] = React.useState("initial");
  const storage = getStorage(app)

  const {dispatch,error} = React.useContext(MovieContext)


  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
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
          setUpdatedMovie(prev => {
            return {...prev,[item.label]: downloadURL}
          })
          setUploaded(0)
        });
      }
    )
    })
  }
  const handleUpload = (e) => {
    e.preventDefault()
    const items = [
        ... img ? [{file: img, label: "img"}] : [],
        ... imgTitle ? [{file: imgTitle, label: "imgTitle"}] : [],
        ... imgSm ? [{file: imgSm, label: "imgSm"}] : [],
        ... trailer ? [{file: trailer, label: "trailer"}] : [],
        ... video ? [{file: video, label: "video"}] : []
    ]
    upload(items)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    updateMovie(_id,updatedMovie,dispatch)
    // createMovie(movie,dispatch)
    setSuccess(error)
    
  }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">isSeries:</span>
              <span className="productInfoValue">{`${movie.isSeries}`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" name="title" placeholder={movie.title} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="desc" placeholder={movie.desc} onChange={handleChange} />
            <label>Year</label>
            <input type="number" name="year" placeholder={movie.year} onChange={handleChange} />
            <label>Limit</label>
            <input type="number" name="limit" placeholder={movie.limit} onChange={handleChange}/>
            <label>Genre</label>
            <input type="text" name="genre" placeholder={movie.genre} onChange={handleChange}/>
            <label>isSeries</label>
            <select name="isSeries" id="isSeries" onChange={handleChange}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <label>Trailer</label>
            <input type="file" name="trailer" onChange={(e) => {setTrailer(e.target.files[0]);setUploaded(prev=> prev+1)}} />
            <label>Video</label>
            <input type="file" name="video" onChange={(e) => {setVideo(e.target.files[0]);setUploaded(prev=> prev+1)}} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              {/* <img src={movie.img} alt="" className="productUploadImg" /> */}
              <div className="item">
                <label>Image</label>
                {img && <img src={URL.createObjectURL(img)} />}
                <label for="img">
                  <Publish />
                </label>
                <input
                  onChange={(e) => {setImg(e.target.files[0]);setUploaded(prev=> prev+1)}}
                  type="file"
                  name="img"
                  id="img"
                  style={{ display: "none" }}
                />
              </div>
              <div className="item">
                <label>Image Title</label>
                {imgTitle && <img src={URL.createObjectURL(imgTitle)} />}
                <label for="imgTitle">
                  <Publish />
                </label>
                <input
                  onChange={(e) => {setImgTitle(e.target.files[0]);setUploaded(prev=> prev+1)}}
                  type="file"
                  name="imgTitle"
                  id="imgTitle"
                  style={{ display: "none" }}
                />
              </div>
              <div className="item">
                <label>Thumbnail Image</label>
                {imgSm && <img src={URL.createObjectURL(imgSm)} />}
                <label for="imgSm">
                  <Publish />
                </label>
                <input
                  onChange={(e) => {setImgSm(e.target.files[0]);setUploaded(prev=> prev+1)}}
                  type="file"
                  name="imgSm"
                  id="imgSm"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            {uploaded === 0 ? (<button onClick={handleSubmit} className="productButton">Update</button>) : (<button onClick={handleUpload} className="productUploadButton">Upload Files First</button>)}
          </div>
        </form>
      </div>
      {success !== "initial" ? (!error ? <span style={{color: 'green'}}>UPDATE SUCCESSFUL</span> : <span style={{color: 'red'}}>UPDATE FAILED</span>) : ""}
    </div>
  );
}
