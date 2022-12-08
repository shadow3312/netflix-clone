import React from 'react'
import { IoIosInformationCircleOutline, IoMdPlay } from 'react-icons/io';

export default function Button({text, iconName, bgColor}) {
    const processIcon = (iconName) => {
        switch(iconName) {
            case 'info':
                return (<IoIosInformationCircleOutline />)
            case 'play':
                return (<IoMdPlay />)
        }
    }
    return (
        <button type="button" class={`${bgColor === '#fff' ? `text-netflix-black bg-[${bgColor}]`: ` text-white`} font-medium rounded text-sm px-8 py-2.5 mr-2 mb-2 mt-4 w-xl flex items-center button hover:opacity-80 object-contain`} style={{backgroundColor: bgColor}}>
            {processIcon(iconName)}
            <span className='font-semibold ml-2 text-xl'>{text}</span>
        </button>
    )
}
