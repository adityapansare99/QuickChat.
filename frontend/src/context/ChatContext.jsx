import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios,token, } = useContext(AuthContext);

  //get all users for side bar
  const getUsers = async () => {
    if(!token)
      return;

    try {
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get("/message/users");
      if (data.success) {
        setUsers(data.data.filteredUsers);
        setUnseenMessages(data.data.unseenMessages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function to get messages for selected user
  const getMessages = async (userId) => {
    if(!userId){
      return;
    }

    try {
      const { data } = await axios.get(`/message/${userId}`);
      if (data.success) {
        setMessages(data.data.messages);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  //send message to selected user
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.data]);
      } else {
        toast.error(data?.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  //function to subscribe to messages for selected user
  const subscribeToMessages = async () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        axios.put(`/message/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]:
            (prevUnseenMessages[newMessage.senderId] || 0) + 1,
        }));
      }
    });
  };

  //function to unsubscribe from messages for selected user
  const unsubscribeFromMessages = async () => {
    if (!socket) return;

    socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    unseenMessages,
    getUsers,
    sendMessage,
    setSelectedUser,
    getMessages,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
