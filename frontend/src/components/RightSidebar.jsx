import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = (props) => {
  return props.selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${props.selectedUser ? "max-md:hidden" : ""}`}>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light'>
        <img src={props.selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 rounded-full aspect-[1/1]'/>
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          <p className='w-2 h-2 rounded-full bg-green-500'></p>{props.selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto'>{props.selectedUser.bio}</p>
      </div>

      <hr className='border-[#ffffff50] my-4'/>
      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
          {
            imagesDummyData.map((image, index) => (
              <div className='cursor-pointer rounded' key={index} onClick={()=>{
                window.open(image) 
              }}>
                <img src={image} alt="" className='h-full rounded-md'/>
              </div>
              
            ))
          }
        </div>
      </div>
      <button className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>Logout </button>
    </div>
  )
}

export default RightSidebar