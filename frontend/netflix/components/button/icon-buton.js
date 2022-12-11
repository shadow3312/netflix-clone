import React from 'react'
import { processIcon } from '../../utils'

export default function IconButon({bgColor, iconName, iconStyle, additionnalStyle, onClick}) {
    return (
        <button className={`text-blue-700 bg-${bgColor} hover:text-white font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center ${bgColor !== 'white' && `border-white-500 hover:border-red-500`} mr-1 border ${additionnalStyle}`} onClick={onClick}>
            {processIcon(iconName, iconStyle)}
        </button>
    )
}
