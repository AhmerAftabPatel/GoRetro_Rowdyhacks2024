import { UserDetailContext } from '@/app/_context/UserDetailContext';
import React, { useContext } from 'react'

function Header() {
  const {userDetail}=useContext(UserDetailContext);

  return (
    <div className='p-3 px-5 flex items-center fixed w-full bg-white justify-between shadow-md'>
        <div className='flex gap-3 items-center'>
            <h2 className='font-bold text-xl'>Era Shift</h2>
        </div>
        <div className='flex gap-3 items-center'>
            <div className='flex gap-1 items-center'>
              <h2>{userDetail?.name}</h2>
              </div>
        </div>
    </div>
  )
}

export default Header