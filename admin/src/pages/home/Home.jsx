import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import React from 'react'
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Home() {
  const {user} = useContext(AuthContext)
  const MONTHS = React.useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
,[])
  const [userStats, setUserStats] = React.useState([]);
  React.useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}users/stats`, {
          headers: {
            token:
              `Bearer ${user.accessToken}`,
          },
        });
        const statsList = res?.data?.sort((a,b) => a._id - b._id)
        res?.data?.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
