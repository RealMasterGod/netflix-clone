import { ArrowBackOutlined } from '@mui/icons-material'
import React from 'react'
import './watch.scss'
import { Link, useLocation } from 'react-router-dom'

const Watch = () => {
    const location = useLocation()
    const movie = location.state.movie
    return (
        <div className='watch'>
            <Link className='link' to={"/"}>
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>
            </Link>
            <video className='video' src={movie.video} autoPlay controls></video>
        </div>
    )
}

export default Watch
