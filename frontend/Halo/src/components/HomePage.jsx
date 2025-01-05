import React from "react";
import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden shadow-2xl bg-slate-950">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
