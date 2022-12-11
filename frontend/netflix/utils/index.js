import { IoIosAdd, IoIosArrowDown, IoIosInformationCircleOutline, IoMdPlay, IoMdThumbsDown, IoMdThumbsUp } from 'react-icons/io';
import { IconContext } from "react-icons";
import { GENRES } from '../constants';
import { Rating } from 'flowbite-react';

const shortenString = (str, limit) => {
    if (str) {
        if (str.length <= limit) {
            return str
        } else {
            const shortened = str.slice(0, limit)+ "..." 
            return shortened
        }
    } else {
        return str
    }
    
    
}

const processIcon = (iconName, style) => {
    switch(iconName) {
        case 'info':
            return (
                <IconContext.Provider value={style}>
                    <IoIosInformationCircleOutline />
                </IconContext.Provider>
            )
        case 'play':
            return (
                <IconContext.Provider value={style}>
                    <IoMdPlay />
                </IconContext.Provider>
            )
        case 'plus':
            return (
                <IconContext.Provider value={style}>
                    <IoIosAdd />
                </IconContext.Provider>
            )
        case 'like':
            return (
                <IconContext.Provider value={style}>
                    <IoMdThumbsUp />
                </IconContext.Provider>
            )
        case 'dislike':
            return (
                <IconContext.Provider value={style}>
                    <IoMdThumbsDown />
                </IconContext.Provider>
            )
        case 'arrow-down':
            return (
                <IconContext.Provider value={style}>
                    <IoIosArrowDown />
                </IconContext.Provider>
            )
    }
}

const processGenres = (ids) => {
    return (
      GENRES.map((genre, i) => {
        if (ids?.includes(genre.id)) {
          return (
          <div key={i} className='mr-0.5 bg-netflix-red hover:bg-[#AF0000] text-blue-800 text-xs font-semibold px-2.5 py-0.1 pb-0.5 rounded-2xl'>
            <span key={i} className="text-white text-[10px] font-medium">{genre.name}</span>
          </div>
        )}
      })
    )
    
}

const processRating = (rate, count) => {
    // Base 5 equivalent of IMDB 10 base rating
    // (8/10)*100 = 80% ; (x/5)*100 = 80% 
    let initialPer = (rate/10)*100
    let finalPer = (5*initialPer)/100
    finalPer = Math.round(finalPer)
    return (
        Array(5).fill().map((item, i) =>
            <Rating key={i}>
                <Rating.Star filled={i < finalPer} />
                {i==4 && <span style={{marginLeft: 5, color: '#7e980b'}}>{count} votes</span>}
            </Rating>
        )
        
    )
}

export {shortenString, processIcon, processGenres, processRating}