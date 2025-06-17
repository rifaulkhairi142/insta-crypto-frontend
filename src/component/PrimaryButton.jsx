import React from 'react';
import LoaderOnButton from '../component/LoaderOnButton';


const PrimaryButton = ({label, onClick, className="", loading}) => {
  

  return (
    <button onClick={(e)=>onClick(e)} className={` px-3 min-h-10 relative justify-center bg-BtnBg items-center rounded-md py-2  cursor-pointer font-binance-plex hover:bg-BtnBg/85 active:bg-textBrand font-semibold text-TextOnYellow w-full flex ${className}`}>
        {loading ?  <LoaderOnButton/> :label}
    </button>
  )
}

export default PrimaryButton