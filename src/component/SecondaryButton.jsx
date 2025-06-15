import React from 'react'
import Loader from './Loader'

const SecondaryButton = ({label, onClick}) => {
  return (
    <button onClick={(e)=>onClick(e)} className=' relative justify-center bg-BtnSecondary rounded-md px-3 py-3 cursor-pointer font-binance-plex hover:bg-BtnSecondary/85 active:bg-textThird hover:text-textSecondary font-semibold text-white w-full flex'>
        {label}
    </button>
  )
}

export default SecondaryButton