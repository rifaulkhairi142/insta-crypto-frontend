import React from 'react'

const PrimaryButton = ({label, onClick, className=""}) => {
  return (
    <button onClick={(e)=>onClick(e)} className={` px-3 justify-center bg-BtnBg rounded-md py-3 cursor-pointer font-binance-plex hover:bg-BtnBg/85 active:bg-textBrand font-semibold text-TextOnYellow w-full flex ${className}`}>
        {label}
    </button>
  )
}

export default PrimaryButton