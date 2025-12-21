import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
const Registration = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getDatabase();
  const handelSignUp = () => {
    setLoading(true);
    setErrors({
      fullName: "",
      email: "",
      password: "",
    });
    if (!registerData.fullName) {
      setLoading(false);
      return setErrors((prev) => ({
        ...prev,
        fullName: "Enter your full name",
      }));
    }
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    )
      .then((response) => {
        updateProfile(auth.currentUser, {
          displayName: registerData.fullName,
        })
          .then(() => {
            set(ref(db, "users/" + response.user.uid), {
              displayName: response.user.displayName,
              email: response.user.email,
            }).then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                toast.success(
                  "Registration Successfully, Please verify your email"
                );
                setTimeout(() => {
                  navigate("/login");
                }, 2000);
              });
            });
          })
          .catch((error) => {});
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        if (errorCode == "auth/invalid-email") {
          return setErrors((prev) => ({
            ...prev,
            email: "A valid email is required",
          }));
        }
        if (errorCode == "auth/email-already-in-use") {
          return setErrors((prev) => ({
            ...prev,
            email: "Email already used",
          }));
        }
        if (errorCode == "auth/missing-password") {
          return setErrors((prev) => ({
            ...prev,
            password: "Password is required",
          }));
        }
        if (errorCode == "auth/weak-password") {
          return setErrors((prev) => ({
            ...prev,
            password: "Enter a strong password at least 6 char.",
          }));
        }
      });
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer position="top-right" />
      <div className="px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl text-center font-bold">Registraion</h2>
          <div className="mt-5">
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
              type="text"
              id="fullName"
            />
            {errors.fullName && (
              <p className="bg-red-600 px-2 rounded text-white w-fit mt-1">
                {errors.fullName}
              </p>
            )}
            <label
              className="font-semibold text-sm text-gray-600 pb-1 mt-4 block"
              htmlFor="login"
            >
              E-mail
            </label>
            <input
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
              type="email"
              id="login"
            />
            {errors.email && (
              <p className="bg-red-600 px-2 rounded text-white w-fit mt-1">
                {errors.email}
              </p>
            )}
            <label
              className="font-semibold text-sm text-gray-600 pb-1 mt-4 block"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              type="password"
              id="password"
            />
            {errors.password && (
              <p className="bg-red-600 px-2 rounded text-white w-fit mt-1">
                {errors.password}
              </p>
            )}
          </div>
          <div className="flex justify-center w-full items-center">
            <div>
              <button className="flex items-center justify-center cursor-pointer py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                <FcGoogle /> <span className="ml-2">Sign in with Google</span>
              </button>
            </div>
          </div>
          <div className="mt-5">
            <button
              onClick={handelSignUp}
              className={`py-2 px-4 ${
                loading ? "bg-blue-600/15" : "bg-blue-600 hover:bg-blue-700"
              }   focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
              type="submit"
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            <Link
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              to="/login"
            >
              or sign In
            </Link>
            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
