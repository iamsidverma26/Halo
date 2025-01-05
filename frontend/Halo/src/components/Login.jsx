import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice.js";
import { BASE_URL } from "../main.jsx";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className="min-w-80 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-slate-950 shadow-2xl bg-slate-900">
        <h1 className="text-3xl font-bold text-center text-slate-200">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base font-bold  label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base font-bold label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <br />
          <p className="text-center">
            <Link to="/register" className="text-cyan-500 underline">
              Don't Have an account? Signup
            </Link>
          </p>
          <div className="flex justify-center mt-2">
            <button type="submit" className="btn btn-secondary btn-sm">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
