import Image from 'next/image'
import React, { useState } from 'react'

function SelectEra({onUserSelect}) {
    const styleOptions=[
        {
            name:'Ancient Egypt',
            image:'/era/ancient-egypt.jpg'
        },
        {
            name:'Classical Greece',
            image:'/era/classic greece.jpg'
        },
        {
            name:'Medival Period',
            image:'/era/medival period.jpg'
        },
        {
            name:'Renaissance',
            image:'/era/Renaissance.jpg'
        },
        {
            name:'Roman empire',
            image:'/era/romanempire.jpg'
        },
        {
            name:'Age of Exploration',
            image:'/era/Age of Exploration.jpg'
        },
        {
            name:'Victorian Era',
            image:'/era/Victorian Era.jpg'
        },
        {
            name:'World War I',
            image:'/era/World War I.jpg'
        },
        {
            name:'World War II',
            image:'/era/World War II.jpg'
        },
        {
            name:'Rowdy Hacks era',
            image:'/era/rowdyhacks.png'
        },

    ]

    const [selectedOption,setSelectedOption]=useState();
  return (
    <div className='mt-16 text-center'>
        <p className='text-2xl'>Where do you want to send your hero?</p>
        <div className='grid grid-cols-2 md:grid-cols-3
         lg:grid-cols-5 xl:grid-cols-4 gap-5 mt-3 gap-y-16'>
            {styleOptions.map((item,index)=>(
                <div className={`relative hover:scale-105 
                transition-all cursor-pointer
                `}>
                    <Image src={item.image} width={200} height={100}
                    className='h-48 object-cover w-full'

                    onClick={()=>{
                        setSelectedOption(item.name)
                        onUserSelect('eraStyle',item.name)
                    }}
                    />
                    {selectedOption==item.name&&'selected'}
                    <h2 className='absolute p-1
                     bg-orange-500 w-full text-white text-center mt-2'>
                        {item.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectEra