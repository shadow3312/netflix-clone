import { IoIosAdd, IoIosArrowDown, IoIosInformationCircleOutline, IoMdPlay, IoMdThumbsDown, IoMdThumbsUp } from 'react-icons/io';
import { IconContext } from "react-icons";

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

export {shortenString, processIcon}