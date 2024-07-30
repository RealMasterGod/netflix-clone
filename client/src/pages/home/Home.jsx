import React, { useContext } from 'react'
import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import axios from 'axios'
import { AuthContext } from '../../authContext/AuthContext'

const Home = ({type}) => {
    const [lists,setLists] = React.useState([])
    const [genre,setGenre] = React.useState(null)
    const {user} = useContext(AuthContext)
    
    React.useEffect(() => {
        const getRandomLists = async () => {
            // console.log(type,genre)
            try {
                const res = await axios.get(`http://localhost:8800/api/lists${type ? "?type="+ type : ""}${genre ? "&genre="+genre : ""}`,{
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    }
                })
                // console.log(`http://localhost:8800/api/lists${type ? "?type="+ type : ""}${genre ? "&genre="+genre : ""}`)
                // console.log(res.data)
                // const res = await axios.get('http://localhost:8800/api/lists')
                setLists(res.data)
                // console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        getRandomLists()
    },[type,genre])
    return (
        <div className='home'>
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map(list => (
                <List list={list} key={list._id} />
            ))}
            <div className="space" style={{height: '250px', position: 'relative'}}>
                <div style={{fontSize: '20px', color: 'white',display: 'flex', alignItems: 'center', justifyContent: 'center',width: "100%",backgroundColor: '#e50914', height: '25%', position: 'absolute', bottom: '0'}} className="footer">
                    Copyright NETFLIX Co.
                </div>
            </div>
        </div>
    )
}

export default Home
