import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import formatDate from "../lib/utils";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = ({ isDarkTheme }) => {
  const { messages, selectedUser, setSelectedUser, getMessages, sendMessage } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const scrollendref = useRef(null);

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [selectedUser]);

  useEffect(() => {
    if (scrollendref.current && messages) {
      scrollendref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className={`h-full max-md:flex max-md:flex-col overflow-scroll relative transition-colors duration-300 ${
      isDarkTheme ? 'backdrop-blur-lg' : 'bg-white/40 backdrop-blur-lg'
    }`}>
      {/* Header */}
      <div className={`flex max-md:fixed max-md:top-0 max-md:right-0 max-md:left-0 h-16 items-center gap-3 py-3 mx-4 border-b transition-colors duration-300 ${
        isDarkTheme ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50"
        />
        <div className="flex-1">
          <p className={`text-base font-semibold flex items-center gap-2 ${
            isDarkTheme ? 'text-white' : 'text-gray-900'
          }`}>
            {selectedUser.fullName}{" "}
            {onlineUsers.includes(selectedUser._id) && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
          </p>
          <p className={`text-xs ${
            isDarkTheme ? 'text-slate-500' : 'text-gray-500'
          }`}>
            {onlineUsers.includes(selectedUser._id) ? 'Active now' : 'Offline'}
          </p>
        </div>
        <img
          onClick={() => {
            setSelectedUser(null);
          }}
          src={assets.arrow_icon}
          alt=""
          className="relative right-9 md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
      </div>

      {/* chat History */}
      <div className="flex max-md:mb-10 max-md:mt-16 flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              message.senderId !== authUser._id && "flex-row-reverse"
            }`}
          >
            {message.image ? (
              <img
                src={message.image}
                alt=""
                className={`max-w-[230px] rounded-2xl overflow-hidden mb-8 shadow-lg transition-transform hover:scale-105 ${
                  isDarkTheme ? 'border border-gray-700' : 'border border-gray-200'
                }`}
              />
            ) : (
              <p
                className={`p-3 max-w-[200px] md:text-sm font-light rounded-2xl mb-8 break-all transition-all shadow-md ${
                  message.senderId === authUser._id
                    ? isDarkTheme
                      ? "rounded-br-none bg-gradient-to-br from-gray-700 to-gray-900 text-white"
                      : "rounded-br-none bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
                    : isDarkTheme
                    ? "rounded-bl-none bg-gray-800 text-white"
                    : "rounded-bl-none bg-white text-gray-900 border border-gray-200"
                }`}
              >
                {message.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="rounded-full w-7 object-cover"
              />
              <p className={`mt-1 ${
                isDarkTheme ? 'text-gray-500' : 'text-gray-400'
              }`}>{formatDate(message.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollendref}></div>
      </div>

      {/* Footer */}
      <div className={`absolute max-md:bottom-0 max-md:fixed left-0 right-0 flex items-center gap-3 p-3 transition-colors duration-300 ${
        isDarkTheme ? '' : 'bg-white/60'
      }`}>
        <div className={`rounded-full px-4 flex flex-1 items-center transition-all duration-200 ${
          isDarkTheme 
            ? 'bg-gray-800/80 hover:bg-gray-800' 
            : 'bg-gray-100 hover:bg-gray-200'
        }`}>
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" ? handleSendMessage(e) : null;
            }}
            value={input}
            type="text"
            placeholder="Type a message..."
            className={`flex-1 text-sm p-3 border-none rounded-lg outline-none ${
              isDarkTheme 
                ? 'text-white placeholder-gray-400' 
                : 'text-gray-900 placeholder-gray-500 bg-transparent'
            }`}
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png , image/jpeg , image/jpg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            />
          </label>
        </div>
        <button
          onClick={handleSendMessage}
          className={`p-2 rounded-full transition-all duration-200 shadow-lg ${
            isDarkTheme
              ? 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
          }`}
        >
          <img
            src={assets.send_button}
            alt=""
            className="w-5"
          />
        </button>
      </div>
    </div>
  ) : (
    <div className={`flex items-center flex-col justify-center gap-4 max-md:hidden transition-colors duration-300 ${
      isDarkTheme ? 'bg-white/10' : 'bg-gradient-to-br from-indigo-50 to-purple-50'
    }`}>
      <div className={`p-6 rounded-full ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-gray-800/40 to-gray-900/40'
          : 'bg-gradient-to-br from-indigo-100 to-purple-100'
      }`}>
        <img src={assets.logo_icon} className="max-w-16" alt="" />
      </div>
      <p className={`text-lg font-medium ${
        isDarkTheme ? 'text-white' : 'text-gray-800'
      }`}>
        Select a user to start a conversation
      </p>
      <p className={`text-sm ${
        isDarkTheme ? 'text-gray-400' : 'text-gray-500'
      }`}>
        Choose from your contacts on the left
      </p>
    </div>
  );
};

export default ChatContainer;