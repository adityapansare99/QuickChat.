import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backedurl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backedurl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  //get the user profile by using the authorization
  const checkAuth = async () => {
    if (token) {
      try {
        const { data } = await axios.get("/user/get-profile");
        if (data.success) {
          setAuthUser(data.data.UserProfile);
          connectSocket(data.data.UserProfile);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
    }
  };

  //login function
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/user/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.data.user);
        connectSocket(data.data.user);
        axios.defaults.headers.common["Authorization"] = data.data.token;
        localStorage.setItem("token", data.data.token);
        setToken(data.data.token);
        toast.success(data.message);
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  //logout function
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["Authorization"] = null;
    toast.success("Logout successfully");
    socket.disconnect();
  };

  //update profile function
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.post("/user/update-profile", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        setAuthUser(data.data.updatedUser);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      checkAuth();
    }
  }, []);

  //connect socket function to handle socket connection and online users upadets
  const connectSocket = async (userData) => {
    if (!userData || socket?.connected) {
      return;
    }

    const newSocket = io(backedurl, {
      query: {
        userId: userData._id,
      },
    });
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    token,
    login,
    logout,
    updateProfile,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
