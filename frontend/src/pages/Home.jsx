import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../context/ChatContext";

const Home = () => {
  const { selectedUser } = useContext(ChatContext);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <div className={`w-full h-screen sm:px-[0.5%] sm:py-[0.5%] transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        className={`fixed sm:top-4 top-3 sm:right-4 right-2 z-50 p-3 rounded-full shadow-xl transition-all duration-300 ${
          isDarkTheme
            ? 'bg-gray-900 text-yellow-400 hover:bg-gray-800 border border-gray-700'
            : 'bg-white text-indigo-600 hover:bg-gray-100 shadow-lg'
        }`}
      >
        {isDarkTheme ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div
        className={`rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative shadow-2xl transition-all duration-300 ${
          selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-2"
        } ${
          isDarkTheme
            ? 'backdrop-blur-xl border-2 border-gray-800'
            : 'backdrop-blur-xl border-2 border-white/50 bg-white/30'
        }`}
      >
        <Sidebar isDarkTheme={isDarkTheme} />
        <ChatContainer isDarkTheme={isDarkTheme} />
        <RightSidebar isDarkTheme={isDarkTheme} />
      </div>
    </div>
  );
};

export default Home;