import React from 'react'

const arr =[1,2,3,4,5,6];

export default function ImageSkel() {
  return (
    <div className={`w-max grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-8 mx-auto mt-6 `}>
        {
            arr.map((item)=>(
                <div key={item} className='md:h-80 w-60 h-60 md:w-80 bg-gray-400 rounded-lg animate-pulse'></div>
            ))
        }
    </div>
  )
}
