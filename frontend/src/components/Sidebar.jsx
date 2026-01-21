import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Sidebar = ({ isDarkTheme }) => {
  const { logout, onlineUsers } = useContext(AuthContext);
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);
  const [inputValue, setInputValue] = useState("");
  const [edit, setEdit] = useState(false);

  const filterUsers = inputValue
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(inputValue.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  const navigate = useNavigate();

  return (
    <div
      className={`h-full p-5 rounded-r-xl overflow-y-scroll transition-colors duration-300 ${
        selectedUser ? "max-md:hidden" : ""
      } ${
        isDarkTheme 
          ? 'bg-[#8185B2]/10 text-white' 
          : 'bg-white/60 text-gray-900 border-r border-gray-200'
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={isDarkTheme ? assets.logo : assets.logo_light} alt="logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              onClick={() => {
                setEdit(!edit);
              }}
              src={isDarkTheme ? assets.menu_icon : assets.more_light}
              alt="menu icon"
              className={`fixed right-13 top-6 sm:relative sm:right-0 sm:top-0 max-h-5 cursor-pointer transition-transform hover:scale-110 ${
                isDarkTheme ? '' : 'opacity-70'
              }`}
            />
            <div
              className={`absolute top-full right-0 z-20 w-32 p-5 rounded-xl shadow-xl border transition-all ${
                edit ? "block" : "hidden"
              } ${
                isDarkTheme 
                  ? 'bg-[#282142] border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              {edit && (
                <div>
                  <p
                    onClick={() => navigate("/profile")}
                    className={`cursor-pointer text-sm flex items-center gap-2 transition-colors ${
                      isDarkTheme ? 'hover:text-gray-400' : 'hover:text-indigo-600' 
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Edit Profile
                  </p>
                  <hr className={`my-2 ${
                    isDarkTheme ? 'border-t border-gray-500' : 'border-t border-gray-200'
                  }`} />
                  <p
                    onClick={() => {
                      logout();
                    }}
                    className={`cursor-pointer text-sm flex items-center gap-2 transition-colors ${
                      isDarkTheme ? 'hover:text-red-400' : 'hover:text-red-600'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`rounded-full flex items-center gap-2 py-3 px-4 mt-5 transition-all duration-200 ${
          isDarkTheme 
            ? 'bg-[#282142] focus-within:bg-[#3a2f5a]' 
            : 'bg-gray-100 focus-within:bg-gray-200'
        }`}>
          <img src={isDarkTheme ? assets.search_icon : assets.search_light} alt="Search" className="w-3 opacity-70" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`bg-transparent border-0 outline-none text-xs flex-1 ${
              isDarkTheme 
                ? 'text-white placeholder-[#c8c8c8]' 
                : 'text-gray-900 placeholder-gray-400'
            }`}
            placeholder="Search User"
          />
        </div>
        <div></div>
      </div>
      <div className="flex flex-col">
        {filterUsers.map((item, key) => (
          <div
            onClick={() => {
              setSelectedUser(item);
              setUnseenMessages((prev) => ({ ...prev, [item._id]: 0 }));
            }}
            key={key}
            className={`relative flex items-center gap-2 p-1 pl-4 rounded-xl max-sm:text-sm cursor-pointer transition-all duration-200 ${
              selectedUser?._id === item._id 
                ? isDarkTheme
                  ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700"
                  : "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200"
                : isDarkTheme
                ? "hover:bg-gray-800/50"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="relative">
              <img
                src={item?.profilePic || assets.avatar_icon}
                alt="user-pic"
                className="w-[35px] aspect-[1/1] rounded-full object-cover ring-2 ring-purple-500/30"
              />
              {onlineUsers.includes(item._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div className="flex flex-col leading-5">
              <p className={`font-medium ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}>{item.fullName}</p>
              {onlineUsers.includes(item._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className={`text-xs ${
                  isDarkTheme ? 'text-neutral-400' : 'text-gray-500'
                }`}>Offline</span>
              )}
            </div>
            {unseenMessages[item._id] > 0 && (
              <p className={`absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full font-semibold ${
                isDarkTheme 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-indigo-500 text-white'
              }`}>
                {unseenMessages[item._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;