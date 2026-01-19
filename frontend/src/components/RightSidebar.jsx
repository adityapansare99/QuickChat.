import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const RightSidebar = ({ isDarkTheme }) => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  //get all images from the messages and save
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`w-full relative overflow-y-scroll transition-colors duration-300 ${
          selectedUser ? "max-md:hidden" : ""
        } ${
          isDarkTheme 
            ? 'bg-[#8185B2]/10 text-white' 
            : 'bg-white/60 text-gray-900 border-l border-gray-200'
        }`}
      >
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light">
          <div className="relative">
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt=""
              className="w-20 rounded-full aspect-[1/1] object-cover ring-4 ring-purple-500/30 shadow-lg"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          <h1 className={`px-10 text-xl font-medium mx-auto flex items-center gap-2 ${
            isDarkTheme ? 'text-white' : 'text-gray-900'
          }`}>
            {onlineUsers.includes(selectedUser._id) && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
            {selectedUser.fullName}
          </h1>
          <p className={`px-10 mx-auto ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-600'
          }`}>{selectedUser.bio || "No bio available"}</p>
        </div>

        <hr className={`my-4 ${
          isDarkTheme ? 'border-[#ffffff50]' : 'border-gray-200'
        }`} />
        
        <div className="px-5 text-xs">
          <div className="flex items-center justify-between mb-2">
            <p className={`font-semibold ${
              isDarkTheme ? 'text-white' : 'text-gray-700'
            }`}>Media</p>
            <span className={`px-2 py-1 rounded-full text-[10px] ${
              isDarkTheme 
                ? 'bg-gray-800 text-gray-300' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {msgImages.length}
            </span>
          </div>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
            {msgImages.length > 0 ? (
              msgImages.map((image, index) => (
                <div
                  className={`cursor-pointer rounded-xl overflow-hidden group transition-all hover:shadow-lg ${
                    isDarkTheme 
                      ? 'ring-1 ring-gray-800 hover:ring-gray-600' 
                      : 'ring-1 ring-gray-200 hover:ring-indigo-400'
                  }`}
                  key={index}
                  onClick={() => {
                    window.open(image);
                  }}
                >
                  <img 
                    src={image} 
                    alt="" 
                    className="h-full w-full object-cover rounded-md transition-transform group-hover:scale-110" 
                  />
                </div>
              ))
            ) : (
              <div className={`col-span-2 text-center py-8 ${
                isDarkTheme ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs">No media shared yet</p>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => logout()}
          className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer shadow-lg transition-all duration-200 ${
            isDarkTheme
              ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
          }`}
        >
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;