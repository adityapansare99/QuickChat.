import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { isDarkTheme, toggleTheme,setIsDarkTheme } = useContext(ThemeContext);

  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentState === "Sign Up" && !isSubmitted) {
      setIsSubmitted(true);
      return;
    }

    login(
      currentState === "Sign Up" ? "register" : "login",
      {
        fullName,
        email,
        password,
        bio,
      },
      checkbox,
    );
  };

  return (
    <div
      className={`min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col transition-colors duration-300 ${
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

      <img
        src={`${isDarkTheme ? assets.logo_big : assets.logolarge}`}
        alt=""
        className="w-[min(30vw,250px)]"
      />

      <form
        onSubmit={onSubmitHandler}
        className={`rounded-2xl flex flex-col shadow-2xl gap-6 p-8 transition-all duration-300 backdrop-blur-xl ${
          isDarkTheme
            ? "text-white bg-white/8 border-2 border-gray-800"
            : "text-gray-900 bg-white/80 border-2 border-white/50"
        }`}
      >
        <h2
          className={`font-semibold text-2xl flex justify-between items-center ${
            isDarkTheme ? "text-white" : "text-gray-900"
          }`}
        >
          {currentState}{" "}
          {isSubmitted && (
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
              }}
              className={`p-2 rounded-lg transition-all ${
                isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <img
                src={assets.arrow_icon}
                alt=""
                className="w-5 cursor-pointer"
              />
            </button>
          )}
        </h2>

        {currentState === "Sign Up" && !isSubmitted && (
          <input
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullName}
            type="text"
            className={`p-3 rounded-xl border outline-none transition-all duration-200 ${
              isDarkTheme
                ? "border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-gray-600 focus:bg-gray-800"
                : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:bg-white"
            }`}
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
              className={`p-3 rounded-xl border outline-none transition-all duration-200 ${
                isDarkTheme
                  ? "border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-gray-600 focus:bg-gray-800"
                  : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:bg-white"
              }`}
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
              className={`p-3 rounded-xl border outline-none transition-all duration-200 ${
                isDarkTheme
                  ? "border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-gray-600 focus:bg-gray-800"
                  : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:bg-white"
              }`}
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
            className={`p-3 rounded-xl border outline-none transition-all duration-200 resize-none ${
              isDarkTheme
                ? "border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-gray-600 focus:bg-gray-800"
                : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:bg-white"
            }`}
            placeholder="Something about yourself......"
            required
          ></textarea>
        )}

        <button
          type="submit"
          className={`py-3 rounded-xl cursor-pointer font-medium shadow-lg transition-all duration-200 ${
            isDarkTheme
              ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
          }`}
        >
          {currentState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div
          className={`flex items-center gap-2 text-sm ${
            isDarkTheme ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <input
            type="checkbox"
            checked={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
            className={`w-4 h-4 rounded cursor-pointer ${
              isDarkTheme ? "accent-gray-700" : "accent-indigo-500"
            }`}
          />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currentState === "Sign Up" ? (
            <p
              className={`text-sm ${
                isDarkTheme ? "text-gray-500" : "text-gray-600"
              }`}
            >
              Already have an account?{" "}
              <span
                className={`font-medium cursor-pointer transition-colors ${
                  isDarkTheme
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
                onClick={() => {
                  setCurrentState("Login");
                  setIsSubmitted(false);
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p
              className={`text-sm ${
                isDarkTheme ? "text-gray-500" : "text-gray-600"
              }`}
            >
              Create an account?{" "}
              <span
                className={`font-medium cursor-pointer transition-colors ${
                  isDarkTheme
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
                onClick={() => {
                  setCurrentState("Sign Up");
                }}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
