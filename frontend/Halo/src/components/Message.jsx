import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUsers } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  // console.log(message);

  const formatTimestamp = (createdAt) => {
    if (!createdAt) return "Invalid time";
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return "Invalid time";
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div
      ref={scroll}
      className={`chat ${
        authUser?._id === message?.senderId ? "chat-end " : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUsers?.profilePhoto
            }
          />
        </div>
      </div>

      <div
        className={`chat-bubble ${
          authUser?._id === message?.senderId
            ? "chat-bubble-primary"
            : "chat-bubble-secondary"
        }`}
      >
        {message?.message}
      </div>
      <div className="chat-header">
        <time className="chat-time text-xs mr-3">
          {formatTimestamp(message?.createdAt)}
        </time>
      </div>
    </div>
  );
};

export default Message;
