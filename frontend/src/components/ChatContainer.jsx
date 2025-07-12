import React, { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import formatDate from "../lib/utils";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
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
    <div className="h-full max-md:flex max-md:flex-col overflow-scroll relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex h-16 items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}{" "}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => {
            setSelectedUser(null);
          }}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7"
        />

        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>

      {/* chat Histroy */}
      <div className="flex max-md:mb-10 flex-col h-[calc(100%-120px] overflow-y-scroll p-3 pb-6">
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
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  message.senderId === authUser._id
                    ? "rounded-br-none"
                    : "rounded-bl-none"
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
                className="rounded-full w-7"
              />
              <p className="text-gray-500">{formatDate(message.createdAt)}</p>
            </div>
          </div>
        ))}

        <div ref={scrollendref}></div>
      </div>

      {/* Footer */}
      <div className="absolute max-md:bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="rounded-full bg-gray-100/12 px-3 flex flex-1 items-center">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" ? handleSendMessage(e) : null;
            }}
            value={input}
            type="text"
            placeholder="Type something..."
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
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
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>

        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt=""
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center flex-col justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-lg font-medium text-white">
        Select a user to start a conversation
      </p>
    </div>
  );
};

export default ChatContainer;
