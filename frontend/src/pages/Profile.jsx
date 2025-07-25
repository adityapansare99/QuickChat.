import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { authUser, updateProfile, checkAuth, token } = useContext(AuthContext);

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
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg">Profile details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
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
            <img
              className={`w-12 h-12 rounded-full aspect-square`}
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : authUser?.profilePic || assets.avatar_icon
              }
              alt=""
            />
            upload profile image
          </label>

          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            required
            placeholder={authUser?.fullName}
            className="p-2 border border-gray-500 rounded-md focus::outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            onChange={(e) => {
              setBio(e.target.value);
            }}
            value={bio}
            placeholder={authUser?.bio}
            className="p-2 border border-gray-500 rounded-md focus::outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
          ></textarea>

          <button
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-1 rounded-full text-lg cursor-pointer"
            type="submit"
          >
            Save
          </button>
        </form>
        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
          src={authUser?.profilePic || assets.logo_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default Profile;
