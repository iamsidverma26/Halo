import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUsers } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUsers, onlineUsers } = useSelector((store) => store.user);
  // console.log(onlineUsers);
  const isOnline = onlineUsers?.includes(user?._id);
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUsers(user));
  };
  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={` ${
          selectedUsers?._id === user?._id ? "bg-slate-700" : ""
        } flex gap-2 items-center p-2 hover:bg-slate-800 rounded-sm cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}  `}>
          <div className="w-10 rounded-full overflow-hidden">
            <img src={user?.profilePhoto} alt="avatar" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className=" flex justify-between gap-2 ">
            <span className="">{user?.fullName}</span>
          </div>
        </div>
        <div className="divider py-3"></div>
      </div>
    </>
  );
};

export default OtherUser;
