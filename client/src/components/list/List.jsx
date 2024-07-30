import React from 'react'
import './list.scss'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import ListItem from '../listItem/ListItem'

const List = ({list}) => {
    const [slideNumber,setSlideNumber] = React.useState(0)
    const [dist,setDist] = React.useState(0)
    // const [isMoved, setIsMoved] = React.useState(false)
    const listRef = React.useRef()
    const handleClick = (dir) => {
        const clicks = list.content.length - Math.floor((window.innerWidth - 100)/250)
        // setIsMoved(true)
        if(dir === "left" && slideNumber > 0) {
            listRef.current.style.transform = `translateX(${dist + 250}px)`
            setDist(dist + 250)
            setSlideNumber(slideNumber - 1)
        }
        if(dir === "right" && slideNumber < clicks) {
            listRef.current.style.transform = `translateX(${dist - 250}px)`
            setDist(dist - 250)
            setSlideNumber(slideNumber + 1)
        }
    }
    return (
        <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: dist === 0 && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item,i) => (
            <ListItem key={i} item={item}/>
          ))
          }
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>

    )
}

export default List
