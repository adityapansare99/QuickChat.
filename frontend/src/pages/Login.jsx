import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentState === "Sign Up" && !isSubmitted) {
      setIsSubmitted(true);
      return;
    }

    login(currentState === "Sign Up" ? "register" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />

      <form
        onSubmit={onSubmitHandler}
        className="rounded-lg flex flex-col shadow-lg gap-6 border-gray-500 text-white bg-white/8 border-2 p-6"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}{" "}
          {isSubmitted && (
            <img
              onClick={() => {
                setIsSubmitted(false);
              }}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currentState === "Sign Up" && !isSubmitted && (
          <input
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {!isSubmitted && (
          <>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {!isSubmitted && (
          <>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {isSubmitted && currentState === "Sign Up" && (
          <textarea
            onChange={(e) => {
              setBio(e.target.value);
            }}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Something about yourself......"
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currentState === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account{" "}
              <span
                className="font-medium text-violet-500 cursor-pointer"
                onClick={() => {
                  setCurrentState("Login");
                  setIsSubmitted(false);
                }}
              >
                Login here
              </span>{" "}
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                className="font-medium text-violet-500 cursor-pointer"
                onClick={() => {
                  setCurrentState("Sign Up");
                }}
              >
                Click here
              </span>{" "}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
