import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

const Profile = () => {
  const { authUser, updateProfile, checkAuth, token } = useContext(AuthContext);
  const { isDarkTheme, toggleTheme,setIsDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      checkAuth();
    }
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser?.fullName);
  const [bio, setBio] = useState(authUser?.bio);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullName", name || authUser?.fullName);
    formdata.append("bio", bio || authUser?.bio);
    formdata.append("image", selectedImage);

    updateProfile(formdata);

    navigate("/");
  };

  return (
    <div
      className={`min-h-screen bg-cover bg-no-repeat flex items-center justify-center transition-colors duration-300 ${
        isDarkTheme
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <button
        onClick={() => {
          setIsDarkTheme(!isDarkTheme);
        }}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-xl transition-all duration-300 ${
          isDarkTheme
            ? "bg-gray-900 text-yellow-400 hover:bg-gray-800 border border-gray-700"
            : "bg-white text-indigo-600 hover:bg-gray-100 shadow-lg"
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

      <button
        onClick={() => navigate("/")}
        className={`fixed top-4 left-4 z-50 p-3 rounded-full shadow-xl transition-all duration-300 flex items-center gap-2 ${
          isDarkTheme
            ? "bg-gray-900 text-white hover:bg-gray-800 border border-gray-700"
            : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <div
        className={`w-5/6 max-w-2xl sm:my-0 my-20 flex items-center justify-between max-sm:flex-col-reverse rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          isDarkTheme
            ? "text-gray-300 border-2 border-gray-800 bg-white/8"
            : "text-gray-900 border-2 border-white/50 bg-white/80"
        }`}
      >
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3
            className={`text-2xl font-semibold ${
              isDarkTheme ? "text-white" : "text-gray-900"
            }`}
          >
            Profile Details
          </h3>

          <label
            htmlFor="avatar"
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all duration-200 ${
              isDarkTheme ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
            }`}
          >
            <input
              onChange={(e) => {
                setSelectedImage(e.target.files[0]);
              }}
              type="file"
              id="avatar"
              accept="image/*"
              hidden
            />
            <div className="relative">
              <img
                className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/30"
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : authUser?.profilePic || assets.avatar_icon
                }
                alt=""
              />
              <div
                className={`absolute -bottom-1 -right-1 p-1 rounded-full ${
                  isDarkTheme ? "bg-gray-700" : "bg-indigo-500"
                }`}
              >
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p
                className={`text-sm font-medium ${
                  isDarkTheme ? "text-white" : "text-gray-900"
                }`}
              >
                Upload profile image
              </p>
              <p
                className={`text-xs ${
                  isDarkTheme ? "text-gray-500" : "text-gray-500"
                }`}
              >
                JPG, PNG or GIF
              </p>
            </div>
          </label>

          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            required
            placeholder={authUser?.fullName}
            className={`p-3 rounded-xl border outline-none transition-all duration-200 ${
              isDarkTheme
                ? "border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-gray-600 focus:bg-gray-800"
                : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:bg-white"
            }`}
          />

          <textarea
            onChange={(e) => {
              setBio(e.target.value);
            }}
            value={bio}
            placeholder={authUser?.bio}
            className={`p-3 rounded-xl border outline-none transition-all duration-200 resize-none ${
              isDarkTheme
                ? "border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-gray-600 focus:bg-gray-800"
                : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:bg-white"
            }`}
            rows={4}
          ></textarea>

          <button
            className={`p-3 rounded-xl text-lg cursor-pointer font-medium shadow-lg transition-all duration-200 ${
              isDarkTheme
                ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
            }`}
            type="submit"
          >
            Save Changes
          </button>
        </form>

        <div className="px-10 py-10 max-sm:pt-10 max-sm:pb-0">
          <div className="relative">
            <img
              className="w-44 h-44 aspect-square rounded-full object-cover ring-4 ring-purple-500/30 shadow-xl"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : authUser?.profilePic || assets.logo_icon
              }
              alt=""
            />
            <div
              className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
                isDarkTheme
                  ? "bg-gray-800 text-white border border-gray-700"
                  : "bg-white text-gray-900 border border-gray-200 shadow-lg"
              }`}
            >
              Preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
