import React, { useContext } from "react";
import "./listItem.scss";
import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";

const ListItem = ({ item }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [movie, setMovie] = React.useState({});
  const {user} = useContext(AuthContext)
  React.useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}movies/find/` + item,
          {
            headers: {
              token:
                `Bearer ${user.accessToken}`,
            },
          }
        );
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link className="link" to="/watch" state={{movie}}>
      <div
        className="listItem"
        // style={{ left: isHovered && index * 245 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.imgSm} alt="imgSm" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
              </div>
              <div style={{marginBottom: '5px'}}>{movie.title}</div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
