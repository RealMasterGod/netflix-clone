import React from "react";
import "./navbar.scss";
import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const {dispatch,user} = React.useContext(AuthContext)

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true)
        return () => {
            window.onscroll = null
        }
    }
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="netflix logo"
          />
          <Link className="link" to={"/"}>
          <span>Home</span>
          </Link>
          <Link className="link"  to={"/series"}>
          <span className="mainLinks">Series</span>
          </Link>
          <Link className="link"  to={"/movies"}>
          <span className="mainLinks">Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>

        <div className="right">
            <Search className="icon"/>
            <span>KID</span>
            <Notifications className="icon"/>
            <img src={user?.profilePic ? user.profilePic : "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-vnl1thqrh02x7ra2.jpg" } alt="profilePic" />
            <div className="profile">
            <ArrowDropDown className="icon"/>
            <div className="options">
                <span>Settings</span>
                <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default Navbar;
