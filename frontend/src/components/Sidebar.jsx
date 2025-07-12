import React, { useContext, useEffect, useState } from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Sidebar = () => {
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
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="menu icon"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>

              <hr className="my-2 border-t border-gray-500" />
              <p
                onClick={() => {
                  logout();
                }}
                className="cursor-pointer text-sm"
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent border-0 outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
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
            className={`relative flex items-center gap-2 p-1 pl-4 rounded max-sm:text-sm cursor-pointer ${
              selectedUser?._id === item._id && "bg-[#282142]/50"
            }`}
          >
            <img
              src={item?.profilePic || assets.avatar_icon}
              alt="user-pic"
              className="w-[35px] aspect-[1/1] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p>{item.fullName}</p>
              {onlineUsers.includes(item._id) ? (
                <span className="text-green-400 text-xs"> Online</span>
              ) : (
                <span className="text-neutral-400 text-xs"> Offline</span>
              )}
            </div>
            {unseenMessages[item._id] > 0 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
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
