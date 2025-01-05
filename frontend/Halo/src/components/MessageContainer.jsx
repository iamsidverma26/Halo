import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedUsers } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUsers, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUsers?._id);

  return (
    <>
      {selectedUsers !== null ? (
        <div className="min-w-full md:min-w-[700px] sm:min-w-[400px] flex flex-col">
          <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center p-2 rounded-sm cursor-pointer">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-8 sm:w-10 rounded-full overflow-hidden">
                <img
                  src={selectedUsers?.profilePhoto}
                  alt={selectedUsers?.fullName || "Profile"}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col sm:gap-1 w-full">
              <div className="flex justify-between items-center gap-2">
                <span className="text-sm sm:text-base font-medium truncate">
                  {selectedUsers?.fullName || "Unknown User"}
                </span>
              </div>
            </div>
          </div>

          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[700px] flex flex-col justify-center items-center">
          <h1 className="text-2xl font-serif">HI , {authUser?.fullName}</h1>
          <h1 className="text-2xl font-serif">Let's start a convo!</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
