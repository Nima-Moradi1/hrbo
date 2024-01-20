"use client";
interface MenuItemProps {
    onClick:() => void;
    label: string;
}

import React from 'react'

const MenuItem: React.FC<MenuItemProps> = ({onClick,label}) => {
  return (
    <div onClick={onClick}
    className='px-4 py-3 hover:bg-neutral-200
    transition font-semibold'>
        {label}
    </div>
  )
}

export default MenuItem