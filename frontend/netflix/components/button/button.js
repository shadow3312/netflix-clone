import React from 'react'
import { processIcon } from '../../utils'

export default function Button({text, iconName, bgColor, iconStyle}) {
    
    return (
        <button type="button" class={`${bgColor === 'transparent' ? `border-white-500 border text-white bg-[${bgColor}]`: ` text-white`} rounded-2xl px-4 py-1.5 mr-2 mb-2 mt-4 w-xl flex items-center button hover:opacity-80 object-contain`} style={{backgroundColor: bgColor}}>
            {processIcon(iconName, iconStyle)}
            <span className='font-medium ml-2 text-md'>{text.toUpperCase()}</span>
        </button>
    )
}
