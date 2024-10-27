import Image from 'next/image'
import React, { useState } from 'react'

function SelectHero({onUserSelect}) {
    const styleOptions=[
        {
            name:'Doctor Brown',
            image:'/heros/doctorbrown.jpg'
        },
        {
            name:'Baby T-Rex',
            image:'/heros/Trex.jpg'
        },
        {
            name:'Elon Musk',
            image:'/heros/elonmusk.jpg'
        },
        {
            name:'Iron Man',
            image:'/heros/isonman.jpg'
        },
        {
            name:'Superman',
            image:'/heros/superman.jpg'
        },
        {
            name:'Wonder woman',
            image:'/heros/wonderwomen.jpg'
        },

    ]

    const [selectedOption,setSelectedOption]=useState();
  return (
    <div className='mt-7 text-center'>
         {/* <h2 className='font-bold text-4xl'>Hero</h2> */}
        <p className='text-2xl'>Select your Hero</p>
        <div className='grid grid-cols-2 md:grid-cols-3
         lg:grid-cols-5 xl:grid-cols-4 gap-5 mt-3 gap-y-12'>
            {styleOptions.map((item,index)=>(
                <div className={`relative hover:scale-105 
                transition-all cursor-pointer
                
                `}>
                    <Image src={item.image} width={200} height={100}
                    className='h-48 object-cover w-full rounded-full'

                    onClick={()=>{
                        setSelectedOption(item.name)
                        onUserSelect('heroStyle',item.name)
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

export default SelectHero