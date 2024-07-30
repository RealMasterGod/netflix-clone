import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = React.useState([]);
  const {user} = useContext(AuthContext)
  React.useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}users?new=true`,
          {
            headers: {
              token:
                `Bearer ${user.accessToken}`,
            },
          }
        );
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers?.map((user) => (
          <li key={user._id} className="widgetSmListItem">
            <img
              src={user.profilePic || "https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg"}
              alt="userImg"
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
